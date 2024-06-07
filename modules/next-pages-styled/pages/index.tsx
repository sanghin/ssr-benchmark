import { testData } from "testdata";
import styled from 'styled-components'

const Flags = styled.div`
  display: flex; 
  flex-direction: column;
`
const TableRow = styled.tr`magin: 3px;`
const TableDataBlue = styled.tr`background-color: blue;`
const TableDataWhite = styled.tr`background-color: white;`
const TableDataRed = styled.tr`background-color: red;`

export const getServerSideProps = async () => {
  return {
    props: {
      data: await testData(),
    },
  };
};

function App({ data }: { data: Awaited<ReturnType<typeof testData>> }) {
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
    <Flags>
      <TableRow>
        <TableDataBlue>{props.entry.id}</TableDataBlue>
        <TableDataWhite>{props.entry.name}</TableDataWhite>
        <TableDataRed>{props.entry.name}</TableDataRed>
      </TableRow>
    </Flags>
  );
}

export default App;
