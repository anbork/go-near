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


export interface IBid {
  id: string;
  isAtMarket: boolean;
  numClaims: number;
  claimedBy: string | null;
  claimedTime: string | null;
  bets: string[] | null;
  betPrice: number;
  claimPrice: number;
  forfeit: string | null;
  isOnAcquisition: boolean;
}


export const mapBidInfo = (b: any): IBid => {
  return b ? {
    id: b.id,
    isAtMarket: true,
    numClaims: b.num_claims,
    claimedBy: b.claim_status ? b.claim_status[0] : null,
    claimedTime: b.claim_status ? b.claim_status[1] : null,
    bets: b.bets,
    betPrice: fromNear(b.bet_price),
    claimPrice: fromNear(b.claim_price),
    forfeit: b.forfeit,
    isOnAcquisition: b.on_acquisition
  } : {
    id: '',
    isAtMarket: false,
    numClaims: 0,
    claimedBy: null,
    claimedTime: null,
    bets: null,
    betPrice: 0,
    claimPrice: 0,
    forfeit: null,
    isOnAcquisition: false
  }
}