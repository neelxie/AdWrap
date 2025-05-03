import { db } from '../db';
import { StaticMedia } from '../types/staticMedia';
import { StreetPoleMedia } from '../types/streetpole';

export const insertStaticMediaItem = async (data: StaticMedia) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const counterRes = await client.query(`
      INSERT INTO media_item_counters (workspace_id, static_counter)
      VALUES ($1, 1)
      ON CONFLICT (workspace_id) DO UPDATE
      SET static_counter = media_item_counters.static_counter + 1
      RETURNING static_counter
    `, [data.workspace]);

    const count = counterRes.rows[0].static_counter;
    const code = `BB-${count}`;

    const result = await client.query(`
      INSERT INTO media_items (
        workspace_id, type, format, location, closest_landmark,
        availability, number_of_faces, code
      )
      VALUES ($1, 'static', $2, $3, $4, $5, $6, $7)
      RETURNING id
    `, [
      data.workspace,
      data.format,
      data.location,
      data.closestLandmark,
      data.availability,
      data.numberOfFaces,
      code
    ]);

    const mediaItemId = result.rows[0].id;

    for (const face of data.staticMediaFaces) {
      await client.query(`
        INSERT INTO static_media_faces (media_item_id, description, availability, images, rent)
        VALUES ($1, $2, $3, $4, $5)
      `, [mediaItemId, face.description, face.availability, face.images, face.rent]);
    }

    await client.query('COMMIT');
    return { mediaItemId, code };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const insertStreetPoleMediaItem = async (data: StreetPoleMedia) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const counterRes = await client.query(`
      INSERT INTO media_item_counters (workspace_id, streetpole_counter)
      VALUES ($1, 1)
      ON CONFLICT (workspace_id) DO UPDATE
      SET streetpole_counter = media_item_counters.streetpole_counter + 1
      RETURNING streetpole_counter
    `, [data.workspace]);

    const count = counterRes.rows[0].streetpole_counter;
    const code = `SP-${count}`;

    const result = await client.query(`
      INSERT INTO media_items (
        workspace_id, type, location, closest_landmark,
        availability, number_of_street_poles, side_route, code
      )
      VALUES ($1, 'streetpole', $2, $3, $4, $5, $6, $7)
      RETURNING id
    `, [
      data.workspace,
      data.location,
      data.closestLandmark,
      data.availability,
      data.numberOfStreetPoles,
      data.sideRoute,
      code
    ]);

    const mediaItemId = result.rows[0].id;

    for (const route of data.routes) {
      await client.query(`
        INSERT INTO routes (media_item_id, side_route, description, number_of_street_poles, price_per_street_pole, images)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        mediaItemId,
        route.sideRoute,
        route.description,
        route.numberOfStreetPoles,
        route.pricePerStreetPole,
        route.images,
      ]);
    }

    await client.query('COMMIT');
    return { mediaItemId, code };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const fetchAllMediaItems = async (limit?: number, offset?: number) => {
  try {
    let items: any[] = [];
    let total = 0;

    if (limit !== undefined && offset !== undefined) {
      const query = 'SELECT * FROM media_items LIMIT $1 OFFSET $2';
      const result = await db.query(query, [limit, offset]);
      items = result.rows;

      const countQuery = 'SELECT COUNT(*) AS total FROM media_items';
      const countResult = await db.query(countQuery);
      total = Number(countResult.rows[0].total);
    } else {
      const query = 'SELECT * FROM media_items';
      const result = await db.query(query);
      items = result.rows;
      total = items.length;
    }

    return { items, total };
  } catch (error) {
    console.error('Error fetching media items:', error);
    throw new Error('Failed to fetch media items');
  }
};

export const fetchMediaItemById = async (id: number) => {
  const result = await db.query(`SELECT * FROM media_items WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateMediaItemById = async (id: number, data: Partial<any>) => {
  const fields: string[] = [];
  const values: any[] = [];

  let i = 1;
  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${i}`);
    values.push(value);
    i++;
  }

  const query = `UPDATE media_items SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`;
  values.push(id);

  const result = await db.query(query, values);
  return result.rows[0];
};

// export const deleteMediaItemById = async (id: number) => {
//   const client = await db.connect();

//   try {
//     await client.query('BEGIN');

//     const check = await client.query(`SELECT * FROM media_items WHERE id = $1`, [id]);
//     if (check.rowCount === 0) {
//       await client.query('ROLLBACK');
//       return { success: false, message: 'Media item not found' };
//     }

//     const type = check.rows[0].type;

//     if (type === 'static') {
//       await client.query(`DELETE FROM static_media_faces WHERE media_item_id = $1`, [id]);
//     } else if (type === 'streetpole') {
//       await client.query(`DELETE FROM routes WHERE media_item_id = $1`, [id]);
//     }

//     await client.query(`DELETE FROM media_items WHERE id = $1`, [id]);

//     await client.query('COMMIT');
//     return { success: true, message: 'Media item deleted successfully' };
//   } catch (err) {
//     await client.query('ROLLBACK');
//     throw err;
//   } finally {
//     client.release();
//   }
// };
// export const deleteMediaItemById = async (id: number): Promise<{ success: boolean; message: string }> => {
//   const client = await db.connect();

//   try {
//     await client.query('BEGIN');

//     const check = await client.query(`SELECT * FROM media_items WHERE id = $1`, [id]);
//     if (check.rowCount === 0) {
//       await client.query('ROLLBACK');
//       return { success: false, message: 'Media item not found' };
//     }

//     const type = check.rows[0].type;

//     if (type === 'static') {
//       await client.query(`DELETE FROM static_media_faces WHERE media_item_id = $1`, [id]);
//     } else if (type === 'streetpole') {
//       await client.query(`DELETE FROM routes WHERE media_item_id = $1`, [id]);
//     }

//     await client.query(`DELETE FROM media_items WHERE id = $1`, [id]);

//     await client.query('COMMIT');
//     return { success: true, message: 'Media item deleted successfully' };
//   } catch (err) {
//     await client.query('ROLLBACK');
//     throw err;
//   } finally {
//     client.release();
//   }
// };
export const deleteMediaItemById = async (id: number): Promise<{ success: boolean; message: string }> => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const check = await client.query(`SELECT * FROM media_items WHERE id = $1`, [id]);
    if (check.rowCount === 0) {
      await client.query('ROLLBACK');
      return { success: false, message: 'Media item not found' };
    }

    const type = check.rows[0].type;

    if (type === 'static') {
      await client.query(`DELETE FROM static_media_faces WHERE media_item_id = $1`, [id]);
    } else if (type === 'streetpole') {
      await client.query(`DELETE FROM routes WHERE media_item_id = $1`, [id]);
    }

    await client.query(`DELETE FROM media_items WHERE id = $1`, [id]);

    await client.query('COMMIT');
    return { success: true, message: 'Media item deleted successfully' };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const searchMediaItems = async (query: string) => {
  const result = await db.query(`
    SELECT * FROM media_items
    WHERE LOWER(location) LIKE LOWER($1)
       OR LOWER(closest_landmark) LIKE LOWER($1)
       OR LOWER(availability) LIKE LOWER($1)
  `, [`%${query}%`]);

  return result.rows;
};
