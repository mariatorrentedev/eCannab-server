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

module.exports = { makeUsersArr, makeSitesArr };
