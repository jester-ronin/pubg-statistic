export interface GameModeStats {
  wins: number;
  kills: number;
  assists: number;
  dBNOs: number;
  headshotKills: number;
  top10s: number;
  heals: number;
  boosts: number;
  longestTimeSurvived: number;
  walkDistance: number;
  suicides: number;
  teamKills: number;
  vehicleDestroys: number;
}

export interface PlayerSeasonStatistic {
  gamemodeStats: {
    solo: GameModeStats;
    'solo-fpp': GameModeStats;
    duo: GameModeStats;
    'duo-fpp': GameModeStats;
    squad: GameModeStats;
    'squad-fpp': GameModeStats;
  };
}
