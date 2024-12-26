/* eslint-disable @next/next/no-img-element */

import Chip from "@/components/common/Chip";
import Tooltip from "@/components/common/Tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDateActivity, getTimeLargest, getTimesAgo } from "@/lib/utils";
import CONSTANT from "@/variables/constant";
import { IAccount } from "@/variables/interface";
import { Dot, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface IProps {
  account: IAccount;
}
function Item({ account }: IProps) {
  const getChipSteamLimit = () => {
    return account?.steam_is_limited ? (
      <Chip variant="error">
        <ThumbsDown size={20} />
        <span>Limited</span>
      </Chip>
    ) : (
      <Chip variant="success">
        <ThumbsUp size={20} />
        <span>Unlimited</span>
      </Chip>
    );
  };

  const getChipSteamExtendedGuarantee = () => {
    return account?.guarantee.duration ? (
      <Chip variant={"default"}>
        <ThumbsUp size={20} />
        <span> {getTimeLargest(account.guarantee.duration)} warranty</span>
      </Chip>
    ) : (
      <Chip variant="error">
        <ThumbsDown size={20} />
        <span>No warranty</span>
      </Chip>
    );
  };

  const getChipSteamLastActivity = () => {
    const lastActivity = getDateActivity(account.steam_last_activity);

    return lastActivity.isSafeDate ? (
      <Chip variant="success">
        <ThumbsUp size={20} />
        <span>Last seen on {lastActivity?.formattedDay}</span>
      </Chip>
    ) : (
      <Chip variant="error">
        <ThumbsDown size={20} />
        <span>Last seen {lastActivity?.formattedDay}</span>
      </Chip>
    );
  };

  const getChipSteamEmail = () => {
    const emailType = CONSTANT.LABEL.find(
      (item) => item.key === account?.email_type
    );
    return emailType ? (
      <Chip variant="success">
        <ThumbsUp size={20} />
        <span>Access to email ({emailType?.label})</span>
      </Chip>
    ) : (
      <Chip variant="error">
        <ThumbsDown size={20} />
        <span>No email access</span>
      </Chip>
    );
  };

  const getGameList = () => {
    return Object.keys(account.steam_full_games.list).map((key: string) => {
      const game = account.steam_full_games.list[key];

      return (
        <Tooltip
          key={key}
          content={`${game?.title} (${game?.playtime_forever}h)`}
        >
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 bg-primaryCustoms rounded-md flex items-center justify-center">
              <img
                className="w-5 h-5 object-cover rounded-sm"
                src={game?.img}
                alt={game?.title}
              />
            </div>
            <p className="px-2 h-7 flex items-center justify-center bg-primaryCustoms rounded-md">
              {game?.title}
            </p>
          </div>
        </Tooltip>
      );
    });
  };

  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex justify-between">
          <Link href={"/"} className="text-sm font-semibold">
            {account?.title_en} | {account?.steam_country}
          </Link>
          <p className="flex items-center text-md font-semibold text-white h-7 p-4 rounded-md bg-gradient-to-r from-primaryCustoms to-primaryCustoms/50">
            {account?.price?.toLocaleString()} $
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="my-2 pb-0 flex flex-wrap items-center gap-2">
        {getChipSteamLastActivity()}
        {getChipSteamLimit()}
        {getChipSteamEmail()}
        {getChipSteamExtendedGuarantee()}
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {getGameList()}
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-primaryCustoms rounded-md flex items-center justify-center">
              <img className="w-4 h-4 lg:w-5 lg:h-5" src="steam.svg" alt="1" />
            </div>
            <Link
              href={"/"}
              className="text-[13px] font-semibold text-secondaryCustoms"
            >
              {account?.seller?.username}
            </Link>
            <p className="flex items-center gap-1 justify-center bg-primaryCustoms rounded-md p-1 px-2 text-xs text-secondaryCustoms">
              <Star size={14} />
              <span>
                {Math.round(100 - account?.seller?.restore_percents)}%
              </span>
              <span>({account?.seller?.sold_items_count})</span>
            </p>
            <p className="text-xs lg:text-sm flex items-center gap-1">
              <Dot size={16} />
              {getTimesAgo(account?.edit_date)}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Item;
