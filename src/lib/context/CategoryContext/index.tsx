/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ICategory, IGame } from "@/variables/interface";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import CONSTANT from "@/variables/constant";

export const initQueries = {
  [CONSTANT.PARAMS.GAME]: "",
  [CONSTANT.PARAMS.HOURS_PLAYED]: "",
  [CONSTANT.PARAMS.HOURS_PLAYED_MAX]: "",
  [CONSTANT.PARAMS.VAC]: "vac",
  [CONSTANT.PARAMS.VAC_SKIP_GAME_CHECK]: false,
  [CONSTANT.PARAMS.RT]: "nomatter",
  [CONSTANT.PARAMS.TRADE_BAN]: "nomatter",
  [CONSTANT.PARAMS.TRADE_LIMIT]: "nomatter",
  [CONSTANT.PARAMS.DAYBREAK]: "",
  [CONSTANT.PARAMS.LIMIT]: "nomatter",
  [CONSTANT.PARAMS.MAFILE]: "nomatter",
  [CONSTANT.PARAMS.REG]: "",
  [CONSTANT.PARAMS.REG_PERIOD]: "",
  [CONSTANT.PARAMS.LMIN]: "",
  [CONSTANT.PARAMS.LMAX]: "",
  [CONSTANT.PARAMS.RMIN]: "",
  [CONSTANT.PARAMS.RMAX]: "",
  [CONSTANT.PARAMS.ELO_MIN]: "",
  [CONSTANT.PARAMS.ELO_MAX]: "",
  [CONSTANT.PARAMS.WINGMAN_RMIN]: "",
  [CONSTANT.PARAMS.WINGMAN_RMAX]: "",
  [CONSTANT.PARAMS.NO_VAC]: false,
  [CONSTANT.PARAMS.MM_BAN]: "nomatter",
  [CONSTANT.PARAMS.BALANCE_MIN]: "",
  [CONSTANT.PARAMS.BALANCE_MAX]: "",
  [CONSTANT.PARAMS.INV_GAME]: '',
  [CONSTANT.PARAMS.INV_MIN]: "",
  [CONSTANT.PARAMS.INV_MAX]: "",
  [CONSTANT.PARAMS.FRIENDS_MIN]: "",
  [CONSTANT.PARAMS.FRIENDS_MAX]: "",
  [CONSTANT.PARAMS.GMIN]: "",
  [CONSTANT.PARAMS.GMAX]: "",
  [CONSTANT.PARAMS.WIN_COUNT_MIN]: "",
  [CONSTANT.PARAMS.WIN_COUNT_MAX]: "",
  [CONSTANT.PARAMS.MEDAL_ID]: "",
  [CONSTANT.PARAMS.MEDAL_OPERATOR_OR]: false,
  [CONSTANT.PARAMS.MEDAL_MIN]: "",
  [CONSTANT.PARAMS.MEDAL_MAX]: "",
  [CONSTANT.PARAMS.GIFT]: null,
  [CONSTANT.PARAMS.GIFT_MIN]: "",
  [CONSTANT.PARAMS.GIFT_MAX]: "",
  [CONSTANT.PARAMS.RECENTLY_HOURS_MIN]: "",
  [CONSTANT.PARAMS.RECENTLY_HOURS_MAX]: "",
  [CONSTANT.PARAMS.COUNTRY]: "",
  [CONSTANT.PARAMS.NOT_COUNTRY]: "",
  [CONSTANT.PARAMS.CS2_PROFILE_RANK_MIN]: "",
  [CONSTANT.PARAMS.CS2_PROFILE_RANK_MAX]: "",
  [CONSTANT.PARAMS.CS2_MAP_RANK]: "",
  [CONSTANT.PARAMS.CS2_MAP_RMIN]: "",
  [CONSTANT.PARAMS.CS2_MAP_RMAX]: "",
  [CONSTANT.PARAMS.SOLOMMR_MIN]: "",
  [CONSTANT.PARAMS.SOLOMMR_MAX]: "",
  [CONSTANT.PARAMS.D2_GAME_COUNT_MIN]: "",
  [CONSTANT.PARAMS.D2_GAME_COUNT_MAX]: "",
  [CONSTANT.PARAMS.D2_WIN_COUNT_MIN]: "",
  [CONSTANT.PARAMS.D2_WIN_COUNT_MAX]: "",
  [CONSTANT.PARAMS.CARDS_MIN]: "",
  [CONSTANT.PARAMS.CARDS_MAX]: "",
  [CONSTANT.PARAMS.CARDS_GAMES_MIN]: "",
  [CONSTANT.PARAMS.CARDS_GAMES_MAX]: "",
  [CONSTANT.PARAMS.D2_BEHAVIOR_MIN]: "",
  [CONSTANT.PARAMS.D2_BEHAVIOR_MAX]: "",
  [CONSTANT.PARAMS.FACEIT_LVL_MIN]: "",
  [CONSTANT.PARAMS.FACEIT_LVL_MAX]: "",
  [CONSTANT.PARAMS.FACEIT_CSGO_LVL_MIN]: "",
  [CONSTANT.PARAMS.FACEIT_CSGO_LVL_MAX]: "",
  [CONSTANT.PARAMS.HAS_FACEIT]: "nomatter",
  [CONSTANT.PARAMS.POINTS_MIN]: "",
  [CONSTANT.PARAMS.POINTS_MAX]: "",
  [CONSTANT.PARAMS.RELEVANT_GMIN]: "",
  [CONSTANT.PARAMS.RELEVANT_GMAX]: "",
  [CONSTANT.PARAMS.LAST_TRANS_DATE]: "",
  [CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD]: "",
  [CONSTANT.PARAMS.LAST_TRANS_DATE_LATER]: "",
  [CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD_LATER]: "",
  [CONSTANT.PARAMS.NO_TRANS]: false,
  [CONSTANT.PARAMS.TRANS]: false,
  [CONSTANT.PARAMS.HAS_ACTIVATED_KEYS]: "nomatter",
  [CONSTANT.PARAMS.RUST_DEATHS_MIN]: "",
  [CONSTANT.PARAMS.RUST_DEATHS_MAX]: "",
  [CONSTANT.PARAMS.RUST_KILLS_MIN]: "",
  [CONSTANT.PARAMS.RUST_KILLS_MAX]: "",
  [CONSTANT.PARAMS.GIFTS_PURCHASE_MIN]: "",
  [CONSTANT.PARAMS.GIFTS_PURCHASE_MAX]: "",
  [CONSTANT.PARAMS.REFUNDS_PURCHASE_MIN]: "",
  [CONSTANT.PARAMS.REFUNDS_PURCHASE_MAX]: "",
  [CONSTANT.PARAMS.INGAME_PURCHASE_MIN]: "",
  [CONSTANT.PARAMS.INGAME_PURCHASE_MAX]: "",
  [CONSTANT.PARAMS.GAMES_PURCHASE_MIN]: "",
  [CONSTANT.PARAMS.GAMES_PURCHASE_MAX]: "",
  [CONSTANT.PARAMS.PURCHASE_MIN]: "",
  [CONSTANT.PARAMS.PURCHASE_MAX]: "",
  [CONSTANT.PARAMS.D2_LAST_MATCH_DATE]: "",
  [CONSTANT.PARAMS.D2_LAST_MATCH_DATE_PERIOD]: "",
  [CONSTANT.PARAMS.PMIN]: "",
  [CONSTANT.PARAMS.PMAX]: "",
  [CONSTANT.PARAMS.TITLE]: "",
  [CONSTANT.PARAMS.ORDER_BY]: "",
  [CONSTANT.PARAMS.SHOW]: "",
  [CONSTANT.PARAMS.TAG_ID]: "",
  [CONSTANT.PARAMS.NOT_TAG_ID]: "",
  [CONSTANT.PARAMS.ORIGIN]: "",
  [CONSTANT.PARAMS.NOT_ORIGIN]: "",
  [CONSTANT.PARAMS.USER_ID]: "",
  [CONSTANT.PARAMS.NSB]: false,
  [CONSTANT.PARAMS.SB]: false,
  [CONSTANT.PARAMS.NSB_BY_ME]: false,
  [CONSTANT.PARAMS.SB_BY_ME]: false,
  [CONSTANT.PARAMS.EG]: "",
  [CONSTANT.PARAMS.HIDE_VIEWED]: false,
  [CONSTANT.PARAMS.CURRENCY]: "",
  [CONSTANT.PARAMS.EMAIL_LOGIN_DATA]: false,
  [CONSTANT.PARAMS.ITEM_DOMAIN]: "",
  [CONSTANT.PARAMS.NOT_ITEM_DOMAIN]: "",
  [CONSTANT.PARAMS.EMAIL_PROVIDER]: "",
  [CONSTANT.PARAMS.NOT_EMAIL_PROVIDER]: "",
  [CONSTANT.PARAMS.EMAIL_TYPE]: "",
  [CONSTANT.PARAMS.LOGIN]: "",
  [CONSTANT.PARAMS.USERNAME]: "",
  [CONSTANT.PARAMS.DELETE_REASON]: "",
  [CONSTANT.PARAMS.DELETE_USERNAME]: "",
}

type CategoryContextType = {
  categories: ICategory[];
  games: IGame[];
  params: any;
  accounts: any;
  commonAccount: any;
  common: {
    loading: boolean;
    error: string;
  };
  queries: object;
  onChangeCommon: (obj: any) => void;
  onChangeQueries: (obj: any) => void;
  setGames: (games: IGame[]) => void;
  setCategories: (categories: ICategory[]) => void;
  setAccounts: (accounts: any) => void;
  setParams: (params: any) => void;
  setCommonAccount: (commonAccount: any) => void;
};

type CategoryProviderType = {
  children?: ReactNode;
  initCategories?: ICategory[];
  initGames?: IGame[];
  initParams?: any;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({
  children,
  initCategories,
  initGames,
  initParams,
}: CategoryProviderType) => {
  const [categories, setCategories] = useState<ICategory[]>(
    initCategories || []
  );
  const [games, setGames] = useState<IGame[]>(initGames || []);
  const [params, setParams] = useState(initParams || []);
  const [accounts, setAccounts] = useState([]);
  const [common, setCommon] = useState({
    loading: false,
    error: "",
  });
  const [commonAccount, setCommonAccount] = useState({
    page: 1,
    perPage: 40,
    totalItems: 0
  });

  const [queries, setQueries] = useState(initQueries);

  const onChangeCommon = (obj: any) => {
    setCommon((prev) => ({ ...prev, ...obj }));
  };
  const onChangeQueries = (obj: any) => {
    setQueries((prev) => ({ ...prev, ...obj }));
  };


  useEffect(() => {
    setCategories(initCategories || []);
  }, [initCategories]);
  useEffect(() => {
    setGames(initGames || []);
  }, [initGames]);
  useEffect(() => {
    setParams(initParams || {});
  }, [initParams]);


  return (
    <CategoryContext.Provider
      value={{
        categories,
        games,
        params,
        common,
        queries,
        accounts,
        commonAccount,
        onChangeCommon,
        onChangeQueries,
        setCategories,
        setGames,
        setAccounts,
        setParams,
        setCommonAccount,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export default CategoryContext;
