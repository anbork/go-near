import {
  CompetitorsBlock,
  CompetitorsFounded,
  CompetitorsTitle,
  FoundedName
} from './layout'
import CompetitorsTable from './CompetitorsTable'
import { useToProfile } from 'helpers/routes'


const Competitors = () => {
  const toProfile = useToProfile();

  return (
    <CompetitorsBlock>
      <CompetitorsTitle>Competitors</CompetitorsTitle>
      <CompetitorsFounded>Founded by: <FoundedName onClick={toProfile}>luozhiwei.near</FoundedName></CompetitorsFounded>
      <CompetitorsTable />
    </CompetitorsBlock>
  );
}

export default Competitors;