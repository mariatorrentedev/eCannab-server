function makeUsersArr() {
  return [
    {
      email: "test1234@gmail.com",
      password: "P@ssword1234",
    },
    {
      email: "test4321@gmail.com",
      password: "P@ssword4321",
    },
    {
      email: "test2435@gmail.com",
      password: "P@ssword2435",
    },
  ];
}
function makeUsersArr2() {
  return [
    {
      id: 1,
      email: "test1234@gmail.com",
      password: "P@ssword1234",
    },
    {
      id: 2,
      email: "test4321@gmail.com",
      password: "P@ssword4321",
    },
    {
      id: 3,
      email: "test2435@gmail.com",
      password: "P@ssword2435",
    },
  ];
}

function makeSitesArr() {
  return [
    {
      id: 1,
      brand: "Momentum 10X",
      logo:
        "https://cdn.shopify.com/s/files/1/0229/1770/9860/files/20191019_222749_360x.jpg?v=1571538815",
      banner:
        "https://giftshopmag.com/wp-content/uploads/2020/01/shutterstock_1486915811-1024x683.jpg",
      seller_description:
        "We're a brand commited with the health and overall wellness!",
      subdomain: "momentum10x",
      resources: [],
    },
    {
      id: 2,
      brand: "Spero",
      logo:
        "https://www.sperocbd.com/wp-content/uploads/2020/08/cropped-Spero-logo.png",
      banner:
        "https://giftshopmag.com/wp-content/uploads/2020/01/shutterstock_1486915811-1024x683.jpg",
      seller_description:
        "Spero uses non-GMO, organically-produced hemp harvested only from – farmsright here in the U.S. of A for sustain nably-made products you can trust.",
      subdomain: "sperocbd",
      resources: [],
    },
    {
      id: 3,
      brand: "XTEND5",
      logo:
        "https://www.sperocbd.com/wp-content/uploads/2020/08/cropped-Spero-logo.png",
      banner:
        "https://i.pinimg.com/736x/0f/69/7f/0f697ffa212aef375d37d27044b3c1e1.jpg",
      seller_description:
        "XTEND5 uses non-GMO, organically-produced hemp harvested only from – farmsright here in the U.S. of A for sustain nably-made products you can trust.",
      subdomain: "XTEND5",
      resources: [],
    },
  ];
}
function makeCustomersArr() {
  return [
    {
      email: "test1234@gmail.com",
      password: "P@ssword1234",
    },
    {
      email: "test4321@gmail.com",
      password: "P@ssword4321",
    },
    {
      email: "test2435@gmail.com",
      password: "P@ssword2435",
    },
  ];
}
function makeCustomersArr2() {
  return [
    {
      id: 1,
      email: "test1234@gmail.com",
      password: "P@ssword1234",
    },
    {
      id: 2,
      email: "test4321@gmail.com",
      password: "P@ssword4321",
    },
    {
      id: 3,
      email: "test2435@gmail.com",
      password: "P@ssword2435",
    },
  ];
}

function makeResourcesArr() {
  return [
    {
      link:
        "https://cdn.shopify.com/s/files/1/0229/1770/9860/files/MOMENTUM_10X_English.pdf?v=1583794815",
      name: "Why CBD is great",
    },
    {
      link:
        "https://cdn.shopify.com/s/files/1/0229/1770/9860/files/MOMENTUM_10X_English.pdf?v=1583794815",
      name: "Why CBD cures cancer",
    },
    {
      link:
        "https://cdn.shopify.com/s/files/1/0229/1770/9860/files/MOMENTUM_10X_English.pdf?v=1583794815",
      name: "Why CBD tastes awful",
    },
  ];
}

function makeProductsArr() {
  return [
    {
      id: 1,
      title: "Multipurpose Oil 600mg Nano Cbd",
      p_image:
        "https://d2ebzu6go672f3.cloudfront.net/media/content/images/p1_CBD_MLOct19_gi1128604887.jpg",
      price: 120,
      in_stock: 10,
      brand: "Momentum 10X",
      p_description: "High quality NANO CBD, feel the natural healing.",
    },
    {
      id: 2,
      title: "Pure CBD 500mg",
      p_image:
        "https://www.sperocbd.com/wp-content/uploads/2020/08/speroheroproduct2.png",
      price: 100,
      in_stock: 20,
      brand: "Spero",
      p_description: "Pure CBD whole plant NO THC",
    },
    {
      id: 3,
      title: "XTEND5 Royal Oil Isolate 500mg",
      p_image:
        "https://xtend5hemp.com/wp-content/uploads/sites/3/2020/10/royal-hemp-500mg-600x600.png",
      price: 120,
      in_stock: 20,
      brand: "XTEND5",
      p_description: "Isolate CBD, natural, healing XTEND your health with us!",
    },
  ];
}

module.exports = {
  makeUsersArr,
  makeSitesArr,
  makeCustomersArr,
  makeResourcesArr,
  makeProductsArr,
  makeUsersArr2,
  makeCustomersArr2,
};
