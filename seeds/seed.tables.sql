BEGIN; 

TRUNCATE 
 users,
 sites,
 products,
 resources,
 site_resources,
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
sites (brand, logo, banner, seller_description, subdomain, user_id)

VALUES 
('Momentum 10x', 'http://bit.ly/momentum_logo', 'http://bit.ly/banner_yellow','We"re a brand commited with the health and overall wellness!','momentum10x', 1),
('Spero', 'http://bit.ly/spero_logo','http://bit.ly/spero_banner','Spero uses non-GMO, organically-produced hemp harvested','spero',2),
('XTEND5', 'http://bit.ly/xtend5_logo', 'http://bit.ly/banner_xtend5','We"re a brand commited with the health and overall wellness!','xtend5',3);

INSERT INTO
products (title, brand, p_image, price, in_stock, p_description, site_id)

VALUES ('Multipurpose Oil 600mg Nano Cbd','Momentum 10X', 'http://bit.ly/momentum_oil600mg',160.00, 250, 'High quality NANO CBD, feel the natural healing.', 1),
('Pure CBD 500mg','Spero', 'http://bit.ly/spero_purecbd', 59.00, 300, 'Pure CBD whole plant NO THC', 2),
('XTEND5 Royal Oil Isolate 500mg','XTEND5', 'http://bit.ly/xtend5_500mg', 89.99, 500, 'Isolate CBD, natural, healing XTEND your health with us!', 3);

INSERT INTO

resources (name, link, user_id)

VALUES ('Why CBD is great for your health?','http://bit.ly/resource_momentum', 1),
('Lab Analysis Pure CBD','http://bit.ly/spero_resource', 2),
('The Eggnog & Ruth"s XTEND5 Mint Chocolate CBD Recipe','https://xtend5.com/the-history-of-eggnog/', 3);

INSERT INTO 
site_resources (resource_id, site_id)
VALUES
(1,1),
(2,1),
(1,3),
(2,1),
(3,1);

INSERT INTO 
customers (name, email, password, site_id)
VALUES (
    'pablo', 'test1@gmail.com', 'Pablo1234!',1
),
(
    'josefina','test2@gmail.com', 'Josefina123!',2
),
(
    'piolin','test3@gmail.com', 'Piolin1234!',3
);

INSERT INTO 
orders (p_title, total_paid, status, customer_id)
VALUES (
    'Multipurpose Oil Nano CBD', 150.99, 'Completed', 1
),(
    'XTEND Royal Oil Isolated 500mg', 99.99, 'Pending', 2
),(
    'Pure CBD 500mg', 49.00, 'Completed', 3
);

COMMIT;