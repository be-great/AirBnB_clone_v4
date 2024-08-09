use hbnb_dev_db; 
-- Insert into the `state` table
INSERT INTO states (id, created_at, updated_at, name) VALUES
('11111111-1111-1111-1111-111111111111', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'California'),
('22222222-2222-2222-2222-222222222222', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Texas');

-- Insert into the `city` table
INSERT INTO cities (id, created_at, updated_at, name, state_id) VALUES
('33333333-3333-3333-3333-333333333333', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'San Francisco', '11111111-1111-1111-1111-111111111111'),
('44444444-4444-4444-4444-444444444444', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Austin', '22222222-2222-2222-2222-222222222222');

-- Insert into the `user` table
INSERT INTO users (id, created_at, updated_at, email, password, first_name, last_name) VALUES
('55555555-5555-5555-5555-555555555555', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'johndoe@example.com', 'password123', 'John', 'Doe'),
('66666666-6666-6666-6666-666666666666', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'janedoe@example.com', 'password456', 'Jane', 'Doe');

-- Insert into the `amenity` table
INSERT INTO amenities (id, created_at, updated_at, name) VALUES
('77777777-7777-7777-7777-777777777777', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Wi-Fi'),
('88888888-8888-8888-8888-888888888888', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Pool');

-- Insert into the `place` table
INSERT INTO places (id, created_at, updated_at, name, city_id, user_id, description, number_rooms, number_bathrooms, max_guest, price_by_night) VALUES
('99999999-9999-9999-9999-999999999999', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Beautiful Apartment', '33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 'A lovely place to stay in San Francisco.', 2, 1, 4, 150),
('10101010-1010-1010-1010-101010101010', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Luxury Condo', '44444444-4444-4444-4444-444444444444', '66666666-6666-6666-6666-666666666666', 'A luxury condo in downtown Austin.', 3, 2, 6, 250);

-- Insert into the `review` table
INSERT INTO reviews (id, created_at, updated_at, text, user_id, place_id) VALUES
('11101011-1010-1010-1010-101010101010', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'Great place, very clean and cozy!', '55555555-5555-5555-5555-555555555555', '99999999-9999-9999-9999-999999999999'),
('12121212-1212-1212-1212-121212121212', '2024-08-09 00:00:00', '2024-08-09 00:00:00', 'The condo was fantastic, close to everything!', '66666666-6666-6666-6666-666666666666', '10101010-1010-1010-1010-101010101010');

