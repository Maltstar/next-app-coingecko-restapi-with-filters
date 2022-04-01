export const getStaticPaths = async ({ id }) => {
  //const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const res = await fetch(
    `https://api.nomics.com/v1/currencies/ticker?key=bae3696bc71b304a970bbb31283a571f08be9fc9&ids=BTC`
  );
  const data = await res.json();
  console.log(data);

  const paths = data.map((ninja) => {
    return {
      params: { id: ninja.id.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

//console.log(getStaticPaths);
export const getStaticProps = async (context) => {
  let data = [];
  const id = context.params.id;
  //const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  const res = await fetch(
    `https://api.nomics.com/v1/currencies/ticker?key=bae3696bc71b304a970bbb31283a571f08be9fc9&per-page=10&ids=${id}`
  );
  //`https://jsonplaceholder.typicode.com/users/${id}`;
  data = await res.json();

  const newData = JSON.parse(JSON.stringify(data));

  console.log(newData);

  return {
    props: { ninja: newData },
  };
};

const Coindetails = ({ ninja }) => {
  return <div>{ninja.id}</div>;
};

export default Coindetails;
