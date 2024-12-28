/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import Button from '@/components/common/Button';
import { useCategory } from '@/lib/context/CategoryContext';
import CONSTANT from '@/variables/constant';
import { IGame } from '@/variables/interface';
import * as _ from 'lodash';
import { ChevronDown, ChevronUp, DollarSign, LoaderCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { GroupInput } from './Group';
import Item from './Item';
import { medals } from '@/variables/constant/params';

function CategoryFilter() {
  const {
    params: data,
    games,
    queries,
    common,
    commonAccount,
    onChangeQueries,
    onChangeCommon,
  }: any = useCategory();

  const [appState, setAppState] = useState({
    showFilter: false,
  });
  const [tempQueries, setTempQueries] = useState(queries);
  const debounced = useDebounceCallback((temp) => {
    if (JSON.stringify(temp) !== JSON.stringify(queries)) onChangeQueries(temp);
  }, 2000);

  const debouncedQueries = useCallback(debounced, []);

  const onChangeAppState = (obj: any) => {
    setAppState((prev) => ({ ...prev, ...obj }));
  };

  const onChangeTempQueries = (obj: any) => {
    onChangeCommon({ loading: true });
    setTempQueries((prev: any) => ({ ...prev, ...obj }));
  };

  const onToggleFilterItemAction = () => {
    onChangeAppState({
      showFilter: !appState?.showFilter,
    });
  };

  const getParamByName = (name: string) => {
    let param: any = [...data?.params, ...data?.base_params]?.find(
      (item) => item?.name === name
    );
    if ([CONSTANT.PARAMS.GAME, CONSTANT.PARAMS.INV_GAME].includes(name))
      param = { ...param, values: onGetGameOptions() };
    return param;
  };

  const getParamsByNames = (names: string[]) => {
    return _.compact(names.map((name) => getParamByName(name)));
  };

  const onOrderByActionClick = (value: string) => {
    onChangeTempQueries({ orderBy: value });
  };

  const getOrderByFilters = () => {
    return [
      { label: 'Default', value: '' },
      { label: 'Cheap First', value: 'price_to_up' },
      { label: 'Expensive first', value: 'price_to_down' },
    ].map((item) => {
      const active = tempQueries[CONSTANT.PARAMS.ORDER_BY] === item?.value;
      return (
        <Button
          key={item?.value}
          variant={active ? 'default' : 'secondary'}
          onClick={() => onOrderByActionClick(item?.value)}
        >
          {item?.label}
        </Button>
      );
    });
  };

  const onGetGameOptions = () => {
    const options = games.slice(0, 32).map((game: IGame) => {
      return {
        label: game?.title,
        value: game?.app_id,
      };
    });
    return options;
  };

  useEffect(() => {
    debouncedQueries(tempQueries);
  }, [tempQueries]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 w-fit'>
          <div className='w-8 h-8 bg-secondaryCustoms rounded-md flex items-center justify-center'>
            <img
              className='w-5 h-5 object-cover bg-secondaryCustoms'
              src={`steam.svg`}
              alt={'logo'}
            />
          </div>
          <h3 className='text-lg font-normal text-secondaryCustoms'>
            Often searched in Steam
          </h3>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='p-2 bg-secondaryCustoms rounded-md'>
          <div className='flex flex-col lg:flex-row gap-2 w-full'>
            <div className='flex flex-col gap-2 lg:gap-4 flex-shrink-0 w-full lg:w-2/5 overflow-hidden'>
              <div className='flex items-center gap-2 w-full'>
                <Item
                  params={getParamByName(CONSTANT.PARAMS.PMIN)}
                  icon={<DollarSign size={16} />}
                  key={CONSTANT.PARAMS.PMIN}
                  value={tempQueries[CONSTANT.PARAMS.PMIN] as any}
                  onChange={(e) => {
                    onChangeTempQueries({ [CONSTANT.PARAMS.PMIN]: e });
                  }}
                />
                <Item
                  params={getParamByName(CONSTANT.PARAMS.PMAX)}
                  icon={<DollarSign size={16} />}
                  key={CONSTANT.PARAMS.PMAX}
                  value={tempQueries[CONSTANT.PARAMS.PMAX] as any}
                  onChange={(e) => {
                    onChangeTempQueries({ [CONSTANT.PARAMS.PMAX]: e });
                  }}
                />
              </div>
              <data className='flex flex-col gap-2'>
                {getParamsByNames([
                  CONSTANT.PARAMS.GAME,
                  ...(appState?.showFilter
                    ? [
                        CONSTANT.PARAMS.EMAIL_TYPE,
                        CONSTANT.PARAMS.ITEM_DOMAIN,
                        CONSTANT.PARAMS.NOT_ITEM_DOMAIN,
                        CONSTANT.PARAMS.EMAIL_PROVIDER,
                        CONSTANT.PARAMS.NOT_EMAIL_PROVIDER,
                        CONSTANT.PARAMS.NSB,
                        CONSTANT.PARAMS.SB,
                        CONSTANT.PARAMS.NSB_BY_ME,
                        CONSTANT.PARAMS.SB_BY_ME,
                      ]
                    : []),
                ]).map((item, index: number) => {
                  return (
                    <Item
                      key={item?.name || index}
                      params={item as any}
                      value={tempQueries[item?.name] as any}
                      onChange={(e) => {
                        onChangeTempQueries({ [item?.name]: e });
                      }}
                    />
                  );
                })}
                {appState.showFilter && (
                  <div>
                    <div className='grid grid-cols-2 gap-2'>
                      {getParamsByNames([
                        CONSTANT.PARAMS.LMIN,
                        CONSTANT.PARAMS.LMAX,
                        CONSTANT.PARAMS.FRIENDS_MIN,
                        CONSTANT.PARAMS.FRIENDS_MAX,
                        CONSTANT.PARAMS.GMIN,
                        CONSTANT.PARAMS.GMAX,
                        CONSTANT.PARAMS.RELEVANT_GMIN,
                        CONSTANT.PARAMS.RELEVANT_GMAX,
                      ]).map((item, index: number) => (
                        <Item
                          key={item?.name || index}
                          params={item as any}
                          value={tempQueries[item?.name] as any}
                          onChange={(e) => {
                            onChangeTempQueries({ [item?.name]: e });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </data>
            </div>
            <div className='flex flex-col gap-2 lg:gap-4 w-full lg:w-3/5 overflow-hidden'>
              <div className='w-full'>
                <Item
                  params={getParamByName(CONSTANT.PARAMS.TITLE)}
                  key={CONSTANT.PARAMS.TITLE}
                  value={tempQueries[CONSTANT.PARAMS.TITLE] as any}
                  onChange={(e) => {
                    onChangeTempQueries({ [CONSTANT.PARAMS.TITLE]: e });
                  }}
                />
              </div>
              <div className='flex flex-col lg:flex-row gap-2'>
                <div className='w-full lg:w-1/2 flex flex-col gap-2'>
                  {getParamsByNames([
                    CONSTANT.PARAMS.COUNTRY,
                    CONSTANT.PARAMS.NOT_COUNTRY,
                    CONSTANT.PARAMS.DAYBREAK,
                    CONSTANT.PARAMS.EG,
                  ]).map((item, index: number) => {
                    return (
                      <Item
                        key={item?.name || index}
                        params={item as any}
                        value={tempQueries[item?.name] as any}
                        onChange={(e) => {
                          onChangeTempQueries({ [item?.name]: e });
                        }}
                      />
                    );
                  })}
                  {appState.showFilter && (
                    <>
                      <div className='flex flex-col gap-2 p-2 rounded-md bg-primaryCustoms'>
                        {[
                          {
                            label: 'Last transaction date more',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.LAST_TRANS_DATE
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.LAST_TRANS_DATE
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.LAST_TRANS_DATE]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Last transaction date not later',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.LAST_TRANS_DATE_LATER
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.LAST_TRANS_DATE_LATER
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.LAST_TRANS_DATE_LATER]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD_LATER
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.LAST_TRANS_DATE_PERIOD_LATER
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS
                                      .LAST_TRANS_DATE_PERIOD_LATER]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item.label || index} {...item} />
                        ))}
                        {getParamsByNames([
                          CONSTANT.PARAMS.NO_TRANS,
                          CONSTANT.PARAMS.TRANS,
                        ]).map((item, index: number) => (
                          <Item
                            key={item?.name || index}
                            params={item as any}
                            value={tempQueries[item?.name] as any}
                            onChange={(e) => {
                              onChangeTempQueries({ [item?.name]: e });
                            }}
                          />
                        ))}
                        {/* Third GR */}
                        {[
                          {
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.GAMES_PURCHASE_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.GAMES_PURCHASE_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.GAMES_PURCHASE_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.GAMES_PURCHASE_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.GAMES_PURCHASE_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.GAMES_PURCHASE_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.REFUNDS_PURCHASE_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.REFUNDS_PURCHASE_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.REFUNDS_PURCHASE_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.REFUNDS_PURCHASE_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.REFUNDS_PURCHASE_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.REFUNDS_PURCHASE_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Total games',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.INGAME_PURCHASE_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.INGAME_PURCHASE_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.INGAME_PURCHASE_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.INGAME_PURCHASE_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.INGAME_PURCHASE_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.INGAME_PURCHASE_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Purchased games from',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.GIFTS_PURCHASE_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.GIFTS_PURCHASE_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.GIFTS_PURCHASE_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.GIFTS_PURCHASE_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.GIFTS_PURCHASE_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.GIFTS_PURCHASE_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Purchase amount',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.PURCHASE_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.PURCHASE_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.PURCHASE_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.PURCHASE_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.PURCHASE_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.PURCHASE_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                      <div className='flex flex-col gap-4 p-2 rounded-md bg-primaryCustoms'>
                        {[
                          {
                            label: 'SDA (.maFile)',
                            headItem: {
                              param: getParamByName(CONSTANT.PARAMS.MAFILE),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.MAFILE
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.MAFILE]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: '5 dollars limit (5$)',
                            headItem: {
                              param: getParamByName(CONSTANT.PARAMS.LIMIT),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.LIMIT
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.LIMIT]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Community ban',
                            headItem: {
                              param: getParamByName(CONSTANT.PARAMS.RT),
                              attribute: {
                                value: tempQueries[CONSTANT.PARAMS.RT] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.RT]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Trade Ban',
                            headItem: {
                              param: getParamByName(CONSTANT.PARAMS.TRADE_BAN),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.TRADE_BAN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.TRADE_BAN]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Trade Limit',
                            headItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.TRADE_LIMIT
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.TRADE_LIMIT
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.TRADE_LIMIT]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Available to obtain cards',
                            subItem: {
                              param: getParamByName(CONSTANT.PARAMS.CARDS_MIN),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CARDS_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CARDS_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(CONSTANT.PARAMS.CARDS_MAX),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CARDS_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CARDS_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Games with available cards',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CARDS_GAMES_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CARDS_GAMES_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CARDS_GAMES_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CARDS_GAMES_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CARDS_GAMES_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CARDS_GAMES_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Has activated keys',
                            headItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.HAS_ACTIVATED_KEYS
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.HAS_ACTIVATED_KEYS
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.HAS_ACTIVATED_KEYS]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                        {getParamsByNames([
                          CONSTANT.PARAMS.VAC_SKIP_GAME_CHECK,
                          CONSTANT.PARAMS.NO_VAC,
                        ]).map((item, index: number) => (
                          <Item
                            key={item?.name || index}
                            params={item as any}
                            value={tempQueries[item?.name] as any}
                            onChange={(e) => {
                              onChangeTempQueries({ [item?.name]: e });
                            }}
                            className='bg-secondaryCustoms'
                          />
                        ))}
                      </div>
                      <div className='flex flex-col gap-4 p-2 rounded-md bg-primaryCustoms'>
                        {[
                          {
                            label: 'Total played for 2 weeks',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.RECENTLY_HOURS_MIN
                              ),
                              attribute: null,
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.RECENTLY_HOURS_MAX
                              ),
                              attribute: null,
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                      <div className='flex flex-col gap-4 p-2 rounded-md bg-primaryCustoms'>
                        {[
                          {
                            label: 'Gifts',
                            subItem: {
                              param: getParamByName(CONSTANT.PARAMS.GIFT_MIN),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.GIFT_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.GIFT_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(CONSTANT.PARAMS.GIFT_MAX),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.GIFT_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.GIFT_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className='w-full lg:w-1/2 flex flex-col gap-2 overflow-hidden'>
                  <div className='rounded-md p-2 bg-primaryCustoms'>
                    {[
                      {
                        label: 'Inventory value',
                        headItem: {
                          param: {
                            ...getParamByName(CONSTANT.PARAMS.INV_GAME),
                            input: 'array',
                          },
                          attribute: {
                            value: tempQueries[CONSTANT.PARAMS.INV_GAME] as any,
                            onChange: (e: any) => {
                              onChangeTempQueries({
                                [CONSTANT.PARAMS.INV_GAME]: e,
                              });
                            },
                          },
                        },
                        subItem: {
                          param: getParamByName(CONSTANT.PARAMS.INV_MIN),
                          attribute: {
                            value: tempQueries[CONSTANT.PARAMS.INV_MIN] as any,
                            onChange: (e: any) => {
                              onChangeTempQueries({
                                [CONSTANT.PARAMS.INV_MIN]: e,
                              });
                            },
                          },
                        },
                        mainItem: {
                          param: getParamByName(CONSTANT.PARAMS.INV_MAX),
                          attribute: {
                            value: tempQueries[CONSTANT.PARAMS.INV_MAX] as any,
                            onChange: (e: any) => {
                              onChangeTempQueries({
                                [CONSTANT.PARAMS.INV_MAX]: e,
                              });
                            },
                          },
                        },
                      },
                    ].map((item, index: number) => {
                      return (
                        <GroupInput key={item?.label || index} {...item} />
                      );
                    })}
                  </div>
                  <div className='flex items-center gap-2 w-full'>
                    <div className='w-2/5'>
                      <Item
                        params={getParamByName(CONSTANT.PARAMS.BALANCE_MIN)}
                        key={CONSTANT.PARAMS.BALANCE_MIN}
                        value={tempQueries[CONSTANT.PARAMS.BALANCE_MIN] as any}
                        onChange={(e) => {
                          onChangeTempQueries({
                            [CONSTANT.PARAMS.BALANCE_MIN]: e,
                          });
                        }}
                      />
                    </div>
                    <div className='w-3/5'>
                      <Item
                        params={getParamByName(CONSTANT.PARAMS.BALANCE_MAX)}
                        key={CONSTANT.PARAMS.BALANCE_MAX}
                        value={tempQueries[CONSTANT.PARAMS.BALANCE_MAX] as any}
                        onChange={(e) => {
                          onChangeTempQueries({
                            [CONSTANT.PARAMS.BALANCE_MAX]: e,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {appState.showFilter && (
                    <>
                      <div className='rounded-md p-2 bg-primaryCustoms'>
                        {[
                          {
                            label: 'Registered earlier',
                            subItem: {
                              param: getParamByName(CONSTANT.PARAMS.REG),
                              attribute: {
                                value: tempQueries[CONSTANT.PARAMS.REG] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.REG]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(CONSTANT.PARAMS.REG_PERIOD),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.REG_PERIOD
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.REG_PERIOD]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                      <div className='flex flex-col gap-4 rounded-md p-2 bg-primaryCustoms'>
                        {[
                          {
                            label: 'CS2',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.WIN_COUNT_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.WIN_COUNT_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.WIN_COUNT_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.WIN_COUNT_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.WIN_COUNT_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.WIN_COUNT_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Premier ELO',
                            subItem: {
                              param: getParamByName(CONSTANT.PARAMS.ELO_MIN),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.ELO_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.ELO_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(CONSTANT.PARAMS.ELO_MAX),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.ELO_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.ELO_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'CS2 Matchmaking ranks',
                            headItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CS2_MAP_RANK
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CS2_MAP_RANK
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CS2_MAP_RANK]: e,
                                  });
                                },
                              },
                            },
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CS2_MAP_RMIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CS2_MAP_RMIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CS2_MAP_RMIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CS2_MAP_RMAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CS2_MAP_RMAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CS2_MAP_RMAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Wingman mode (2x2)',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.WINGMAN_RMIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.WINGMAN_RMIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.WINGMAN_RMIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.WINGMAN_RMAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.WINGMAN_RMAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.WINGMAN_RMAX]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                      <div className='flex flex-col gap-2 rounded-md p-2 bg-primaryCustoms'>
                        {[
                          {
                            label: 'CS2 Profile Rank',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CS2_PROFILE_RANK_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CS2_PROFILE_RANK_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CS2_PROFILE_RANK_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.CS2_PROFILE_RANK_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.CS2_PROFILE_RANK_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.CS2_PROFILE_RANK_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            subItem: {
                              param: getParamByName(CONSTANT.PARAMS.MEDAL_MIN),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.MEDAL_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.MEDAL_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(CONSTANT.PARAMS.MEDAL_MAX),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.MEDAL_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.MEDAL_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                        {getParamsByNames([
                          CONSTANT.PARAMS.MEDAL_ID,
                          CONSTANT.PARAMS.MEDAL_OPERATOR_OR,
                        ]).map((item, index: number) => {
                          const param = item;
                          if (item?.name === CONSTANT.PARAMS.MEDAL_ID)
                            param.values = medals;

                          return (
                            <Item
                              key={item?.name || index}
                              params={item as any}
                              value={tempQueries[item?.name] as any}
                              onChange={(e) => {
                                onChangeTempQueries({ [item?.name]: e });
                              }}
                              className='bg-secondaryCustoms'
                            />
                          );
                        })}
                        {[
                          {
                            label: 'FACEIT level',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.FACEIT_LVL_MIN
                              ),
                              attribute: null,
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.FACEIT_LVL_MAX
                              ),
                              attribute: null,
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                        {[
                          {
                            label: 'Active MM ban in CS2',
                            headItem: {
                              param: getParamByName(CONSTANT.PARAMS.MM_BAN),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.MM_BAN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.MM_BAN]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                      <div className='flex flex-col gap-2 rounded-md p-2 bg-primaryCustoms'>
                        {[
                          {
                            label: 'Dota 2',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.SOLOMMR_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.SOLOMMR_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.SOLOMMR_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.SOLOMMR_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.SOLOMMR_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.SOLOMMR_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_GAME_COUNT_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_GAME_COUNT_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_GAME_COUNT_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_GAME_COUNT_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_GAME_COUNT_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_GAME_COUNT_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_WIN_COUNT_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_WIN_COUNT_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_WIN_COUNT_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_WIN_COUNT_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_WIN_COUNT_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_WIN_COUNT_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Behavior score',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_BEHAVIOR_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_BEHAVIOR_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_BEHAVIOR_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_BEHAVIOR_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_BEHAVIOR_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_BEHAVIOR_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            label: 'Last game more',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_LAST_MATCH_DATE
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_LAST_MATCH_DATE
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_LAST_MATCH_DATE]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.D2_LAST_MATCH_DATE_PERIOD
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.D2_LAST_MATCH_DATE_PERIOD
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.D2_LAST_MATCH_DATE_PERIOD]:
                                      e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                      <div className='flex flex-col gap-2 rounded-md p-2 bg-primaryCustoms'>
                        {[
                          {
                            label: 'Rust',
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.RUST_DEATHS_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.RUST_DEATHS_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.RUST_DEATHS_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.RUST_DEATHS_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.RUST_DEATHS_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.RUST_DEATHS_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                          {
                            subItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.RUST_KILLS_MIN
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.RUST_KILLS_MIN
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.RUST_KILLS_MIN]: e,
                                  });
                                },
                              },
                            },
                            mainItem: {
                              param: getParamByName(
                                CONSTANT.PARAMS.RUST_KILLS_MAX
                              ),
                              attribute: {
                                value: tempQueries[
                                  CONSTANT.PARAMS.RUST_KILLS_MAX
                                ] as any,
                                onChange: (e: any) => {
                                  onChangeTempQueries({
                                    [CONSTANT.PARAMS.RUST_KILLS_MAX]: e,
                                  });
                                },
                              },
                            },
                          },
                        ].map((item, index: number) => (
                          <GroupInput key={item?.label || index} {...item} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='my-4 flex flex-col gap-2'>
            <div className='flex flex-col gap-2 lg:flex-row items-center justify-between'>
              <div className='w-full order-2 lg:order-2'>
                <Button
                  variant={'secondary'}
                  onClick={onToggleFilterItemAction}
                >
                  {appState.showFilter ? (
                    <>
                      Collapse
                      <span>
                        <ChevronUp />
                      </span>
                    </>
                  ) : (
                    <>
                      Show Filters
                      <span>
                        <ChevronDown />
                      </span>
                    </>
                  )}
                </Button>
              </div>
              <div className='w-full order-1 lg:order-1'>
                <Button variant={'secondary'} className='w-full'>
                  {common.loading ? (
                    <>
                      <span className='animate-spin'>
                        <LoaderCircle />
                      </span>
                      Loading...
                    </>
                  ) : (
                    <>
                      Show ~ {commonAccount?.totalItems?.toLocaleString()}{' '}
                      accounts
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-2'>{getOrderByFilters()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
