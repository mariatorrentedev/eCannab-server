BEGIN; 

TRUNCATE 
 users,
 sites,
 products,
 resources,
 customers,
 orders
 RESTART IDENTITY CASCADE;

INSERT INTO
users (email, password)
VALUES (
    'test1@gmail.com', 'Astapostapulos66*'
),
(
    'test2@gmail.com', 'cascabeletoS1324+'
),
(
    'test3@gmail.com', 'DonRamon1900!'
);

INSERT INTO
sites (brand, logo, banner, seller_description, subdomain, resources, user_id)

VALUES 
('Momentum 10x', 'http://bit.ly/momentum_logo', 'http://bit.ly/banner_yellow','We"re a brand commited with the health and overall wellness!','momentum10x', ARRAY[1,2,3,4], 1),
('Spero', 'http://bit.ly/spero_logo','http://bit.ly/spero_banner','Spero uses non-GMO, organically-produced hemp harvested','spero', ARRAY[1,2,3,4], 2),
('XTEND5', 'http://bit.ly/xtend5_logo', 'http://bit.ly/banner_xtend5','We"re a brand commited with the health and overall wellness!','xtend5',ARRAY[1,2,3,4], 3);

INSERT INTO
products (title, brand, p_image, price, in_stock, p_description, site_id)

VALUES ('Multipurpose Oil 600mg Nano Cbd','Momentum 10X', 'http://bit.ly/momentum_oil600mg',160.00, 250, 'High quality NANO CBD, feel the natural healing.', 1),
('Pure CBD 500mg','Spero', 'http://bit.ly/spero_purecbd', 59.00, 300, 'Pure CBD whole plant NO THC', 2),
('XTEND5 Royal Oil Isolate 500mg','XTEND5', 'http://bit.ly/xtend5_500mg', 89.99, 500, 'Isolate CBD, natural, healing XTEND your health with us!', 3);

INSERT INTO

resources (name, link, r_image, site_id)

VALUES ('Why CBD is great for your health?','http://bit.ly/resource_momentum', 'http://bit.ly/resource_img',1),
('Lab Analysis Pure CBD','http://bit.ly/spero_resource','http://bit.ly/r_image', 2),
('The Eggnog & Ruth"s XTEND5 Mint Chocolate CBD Recipe','https://xtend5.com/the-history-of-eggnog/','http://bit.ly/cbd-food', 3);



INSERT INTO 
customers (email, password, site_id)
VALUES (
    'testpablo@gmail.com', '$2a$12$vYmcE6sdFL9G7oOj2fv.J.tVaVT3WIElP4MVOCFbWGqqXetsBwswu', 1
),
(
    'testjosefina@gmail.com', 'Josefina123!',2
),
(
    'testpiolin@gmail.com', 'Piolin1234!',3
);

INSERT INTO 
orders (total_paid, products, customer_id)
VALUES (
     150.99, ARRAY[1, 2, 3, 4],  1
),(
     99.99, ARRAY[3, 4, 6, 7], 2
),(
     49.00, ARRAY[3, 4, 2, 1], 3
);

COMMIT;