import { testData } from "testdata";


function App({ props: {data} }: any) {
  return <Table data={data} />;
}

function Table({ data }: { data: Awaited<ReturnType<typeof testData>> }) {
  return (
    <table>
      <tbody>
        {data.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </tbody>
    </table>
  );
}

function Entry(props: {
  entry: { id: string; name: string; asyncData?: () => Promise<string> };
}) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

App.getInitialProps = async () => {
  return {
    props: {
      data: await testData(),
    },
  };
};

export default App;
