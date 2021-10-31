import { fromNear } from 'helpers/near'

export interface IStat {
  numProfiles: number;
  numBids: number;
  numBidsOnClaim: number;
  totalCommission: number;
  numOffers: number;
  numBets: number;
  numClaims: number;
  numAcquisitions: number;
}

export const mapStats = (s: any[]): IStat => {
  return {
    numProfiles: s[0],
    numBids: s[1],
    numBidsOnClaim: s[2],
    totalCommission: fromNear(s[3]),
    numOffers: s[4],
    numBets: s[5],
    numClaims: s[6],
    numAcquisitions: s[7]
  }
}