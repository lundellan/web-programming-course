export default async function FetchInventory() {
  const queries = ["foundations", "proteins", "extras", "dressings"];
  const url = "http://localhost:8080/";
  // const inventory = await fetchNestedIngredients(url, "foundations");
  const inventory = {
    ...(await fetchNestedIngredients(url, "foundations")),
    ...(await fetchNestedIngredients(url, "proteins")),
    ...(await fetchNestedIngredients(url, "extras")),
    ...(await fetchNestedIngredients(url, "dressings")),
  };
  return inventory;
  // console.log(inventory);
  // return inventory;
}

async function fetchNestedIngredients(url, top) {
  return fetch(url + top)
    .then(async (x) => ({ x, mid: await x.json() }))
    .then(async (y) => ({
      bot: await Promise.all(
        y.mid.map((z) => fetch(url + top + "/" + z).then((a) => a.json()))
      ),
      mid: y.mid,
    }))
    .then((z) => {
      const ret = {};
      // console.log(z);
      z.mid.map((a, i) => (ret[a] = { ...z.bot[i], [top.slice(0, -1)]: true }));
      return ret;
    });
  /* Sample
let inventory = {
  Sallad: {price: 10, foundation: true, vegan: true},
  Pasta: {price: 10, foundation: true, gluten: true},
  'Sallad + Pasta': {price: 10, foundation: true, gluten: true},
  'Sallad + Matvete': {price: 10, foundation: true, vegan: true, gluten: true},
  'Sallad + Glasnudlar': {price: 10, foundation: true, gluten: true},
  'Sallad + Quinoa': {price: 10, foundation: true, vegan: true},

  'Kycklingfilé': {price: 10, protein: true},
  'Rökt kalkonfilé': {price: 10, protein: true},
  'Norsk fjordlax': {price: 30, protein: true},
  'Handskalade räkor från Smögen': {price: 40, protein: true},
  'Pulled beef från Sverige': {price: 15, protein: true},
  'Marinerad bönmix': {price: 10, protein: true, vegan: true},

*/

  // return Promise.all(
  //   fetchJson(url + list[0]).then((a) =>
  //     a.forEach(async (b) => fetchProperties(b))
  //   )
  // );
}

async function fetchProperties(url, property) {
  const props = await fetchJson(url);
  return { ...props, [property]: true };
}

async function fetchJson(url) {
  return await fetch(url).then((a) => a.json());
}

/*
Legacy
*/
// return Promise.all(
//   list.map(async (top) => {
//     return fetch(url + top)
//       .then((a) => a.json())
//       .then((a) =>
//         Promise.all(
//           a.map((b) => (
//             fetch(url + top + "/" + b).then((c) => c.json())
//           )
//         ))
//         .then(a=> a.map(b=> {[b] : }) )
//       );
//   })
// ).then((a) => console.log(a));
// return list.map(async (top) => {
//   return fetch(url + top)
//     .then((a) => a.json())
//     .then((a) => {
//       a.map(
//         async (mid) =>
//           await fetch(url + top + "/" + mid).then((b) => b.json())
//       );
//     });
// });
// return fetch(url + list[0])
// .then((a) => a.json())
// .then((a) => a.forEach(fetch(url + ))),
// .then(a => ({inventory: {}}))
// .then((x) => x.json())
// .then(x => fetch(url + ))
// return fetch(url + top).then((x) => x.json());
// .then(async (x) => ({ x: await x.json() }));
// return fetch(url + top)
//   .then(async (x) => ({ x, mid: await x.json() }))
//   .then(async (y) => ({
//     bot: await Promise.all(
//       y.mid.map((z) => fetch(url + top + "/" + z).then((a) => a.json()))
//     ),
//     mid: y.mid,
//   }))
//   .then((z) => {
//     const ret = {};
//     ret[top] = {};
//     // console.log(z);
//     z.mid.map((a, i) => (ret[top][a] = z.bot[i]));
//     return ret;
//   });
// // .then((a) => console.log(a));
// const inventory = {};
// const inventory = {
//   ...(await fetchNestedIngredients(url, "foundations")),
//   ...(await fetchNestedIngredients(url, "proteins")),
//   ...(await fetchNestedIngredients(url, "extras")),
//   ...(await fetchNestedIngredients(url, "dressings")),
// };
// const inventory = queries.reduce(async (prev = "{}", curr) => {
//   console.log(prev, curr);
//   return {}
//   // return {
//   //   ...prev,
//   //   ...(await fetchNestedIngredients(url, curr)),
//   // };
// // });
// console.log({
//   ...(await fetchNestedIngredients(url, "foundations")),
//   ...(await fetchNestedIngredients(url, "proteins")),
//   ...(await fetchNestedIngredients(url, "extras")),
//   ...(await fetchNestedIngredients(url, "dressings")),
// });
