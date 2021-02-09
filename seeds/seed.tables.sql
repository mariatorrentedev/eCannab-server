BEGIN; 

TRUNCATE 
 users,
 sites,
 products,
 resources,
 site_resources,
 customers,
 orders,
RESTART IDENTITY CASCADE;

INSERT INTO
users (name, email, password)
VALUES (
    'andrea', 'test1@gmail.com', 'Astapostapulos66*'
),
(
    'teston','test2@gmail.com', 'cascabeletoS1324+'
),
(
    'ramon','test3@gmail.com', 'DonRamon1900!'
);

INSERT INTO
sites (brand, logo, seller_description, subdomain, user_id)

VALUES ("Momentum 10x", "https://cdn.shopify.com/s/files/1/0229/1770/9860/files/20191019_222749_360x.jpg?v=1571538815", "https://giftshopmag.com/wp-content/uploads/2020/01/shutterstock_1486915811-1024x683.jpg","We're a brand commited with the health and overall wellness!","momentum10x",1),
("Spero", "https://www.sperocbd.com/wp-content/uploads/2020/08/cropped-Spero-logo.png","Spero uses non-GMO, organically-produced hemp harvested only from – farmsright here in the U.S. of A for sustain nably-made products you can trust.","spero",2),
("XTEND5", "https://cdn.shopify.com/s/files/1/0229/1770/9860/files/20191019_222749_360x.jpg?v=1571538815", "We're a brand commited with the health and overall wellness!","xtend5",1);

INSERT INTO
products (title, brand, p_image, price, in_stock, p_description, site_id)

VALUES ("Multipurpose Oil 600mg Nano Cbd","Momentum 10X", "https://d2ebzu6go672f3.cloudfront.net/media/content/images/p1_CBD_MLOct19_gi1128604887.jpg",160.00, 250, "High quality NANO CBD, feel the natural healing.", 1),
("Pure CBD 500mg","Spero", "https://www.sperocbd.com/wp-content/uploads/2020/08/speroheroproduct2.png", 59.00, 300, "Pure CBD whole plant NO THC", 2),
("XTEND5 Royal Oil Isolate 500mg","XTEND5", "https://xtend5hemp.com/wp-content/uploads/sites/3/2020/10/royal-hemp-500mg-600x600.png", 89.99, 500, "Isolate CBD, natural, healing XTEND your health with us!", 3);

INSERT INTO

resources (name, link)

VALUES ("Why CBD is great for your health?","https://cdn.shopify.com/s/files/1/0229/1770/9860/files/MOMENTUM_10X_English.pdf?v=1583794815", 1),
("Why NANO CBD?","https://cdn.shopify.com/s/files/1/0229/1770/9860/files/MOMENTUM_10X_English.pdf?v=1583794815", 2),
("CBD vs THC?","https://cdn.shopify.com/s/files/1/0229/1770/9860/files/MOMENTUM_10X_English.pdf?v=1583794815", 3);

INSERT INTO 
site_resources (resource_id, site_id)
VALUES(1,1),
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
    'Multipurpose Oil Nano CBD', 150.99, "Completed", 1
),(
    'XTEND Royal Oil Isolated 500mg', 99.99, "Pending", 2
),(
    'Pure CBD 500mg', 49.00, "Completed", 3
);

COMMIT;