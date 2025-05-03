import { db } from '../db';

async function seed() {
  try {
    await db.query('BEGIN');

    // 1. Seed Workspaces
    await db.query(`
      INSERT INTO workspaces (id, name, email, address, location)
      VALUES 
        (1, 'Ogilvy Outdoor', 'info@ogilvyoutdoor.com', '12 Herbert Macaulay Way, Yaba', 'Lagos Mainland'),
        (2, 'Proactive Media', 'contact@proactive.ng', 'Plot 14 Wuse Zone 5', 'Abuja')
      ON CONFLICT (id) DO NOTHING;
    `);

    // 2. Seed Static Media
    const staticRes = await db.query(`
      INSERT INTO media_items (id, workspace_id, type, format, location, closest_landmark, availability, number_of_faces, code)
      VALUES 
        (1, 1, 'static', 'standard', 'Iyana Oworo, Lagos', 'Third Mainland Bridge', 'Available', 2, 'BB-1')
      RETURNING id;
    `);
    const staticMediaItemId = staticRes.rows[0].id;

    await db.query(`
      INSERT INTO static_media_faces (id, media_item_id, description, availability, images, rent)
      VALUES 
        (101, $1, 'Facing traffic towards Island', 'Available', ARRAY['https://example.com/billboard-1a.jpg'], 50000),
        (102, $1, 'Facing Mainland', 'Booked', ARRAY['https://example.com/billboard-1b.jpg'], 45000)
    `, [staticMediaItemId]);

    // 3. Seed Streetpole Media
    const streetpoleRes = await db.query(`
      INSERT INTO media_items (id, workspace_id, type, location, closest_landmark, availability, number_of_street_poles, side_route, code)
      VALUES 
        (2, 2, 'streetpole', 'Aminu Kano Crescent, Abuja', 'Wuse Market', 'Available', 3, ARRAY['North', 'South'], 'SP-1')
      RETURNING id;
    `);
    const streetpoleId = streetpoleRes.rows[0].id;

    await db.query(`
      INSERT INTO routes (id, media_item_id, side_route, description, number_of_street_poles, price_per_street_pole, images)
      VALUES 
        (201, $1, 'North', 'Towards Berger Junction', 2, 25000, ARRAY['https://example.com/streetpole-1a.jpg']),
        (202, $1, 'South', 'Back toward Banex Plaza', 1, 20000, ARRAY['https://example.com/streetpole-1b.jpg'])
    `, [streetpoleId]);

    await db.query('COMMIT');
    console.log('Seeding is completed.');
  } catch (err) {
    await db.query('ROLLBACK');
    console.error('Seeding has failed:', err);
  } finally {
    await db.end();
  }
}

seed();
