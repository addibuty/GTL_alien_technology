//Version:1.2.0
;'use strict'
;(function () {
    const world_collection = ['gtceu:large_fragment_world_collection_machine','gtceu:ulv_fragment_world_collection_machine']
    const hvItems = [
        'gtceu:iv_parallel_hatch',

    ]
    const ivItems = [
        'gtceu:large_mixer', // 大型搅拌机
        'gtceu:large_maceration_tower', // 大型研磨塔
        'gtceu:large_chemical_bath', // 大型化学浸洗机
        'gtceu:large_electrolyzer', // 大型电解机
        'gtceu:chemical_distort', // 化学扭曲机
        'gtceu:large_centrifuge', // 大型离心机
        'gtceu:large_electromagnet', // 大型电磁选矿机
        'gtceu:large_packer', // 大型打包机
        'gtceu:large_assembler', // 大型组装机
        'gtceu:large_circuit_assembler', // 大型电路装配线
        'gtceu:large_arc_smelter', // 大型电弧炉
        'gtceu:large_engraving_laser', // 大型激光蚀刻机
        'gtceu:large_sifting_funnel', // 大型筛选漏斗
        'gtceu:large_autoclave', // 大型高压釜
        'gtceu:large_material_press', // 大型冲压机床
        'gtceu:large_brewer', // 大型酿造机
        'gtceu:large_cutter', // 大型切割机
        'gtceu:large_distillery', // 大型蒸馏室
        'gtceu:large_extractor', // 大型提取机
        'gtceu:large_extruder', // 大型挤压机
        'gtceu:large_solidifier', // 大型流体固化器
        'gtceu:large_wiremill', // 大型线材轧机
        'gtceu:large_gas_collector' // 大型集气室
    ]
    const reRocket = [
        'ad_astra:tier_1_rocket',
        'ad_astra:tier_2_rocket',
        'ad_astra:tier_3_rocket',
        'ad_astra:tier_4_rocket',
        'ad_astra_rocketed:tier_5_rocket',
        'ad_astra_rocketed:tier_6_rocket',
        'ad_astra_rocketed:tier_7_rocket'
    ]
    const scrubber = ['minecraft:reinforced_deepslate','gtceu:lv_gas_collector','gtceu:ev_gas_collector']
    const air_scrubber = ['gtceu:lv_air_scrubber','gtceu:mv_air_scrubber','gtceu:hv_air_scrubber','gtceu:ev_air_scrubber'] 
    function addShiftTooltip(text, lines) {
        lines.forEach(line => text.add(line))
    }
    function createalienTopLine() {
        return Text.literal(' §3▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁')
    }
    function createAlienText() {
        return Text.literal('✿        §9按住§eSHIFT§9查看§4外星人语录§f       ✿')
    }

    ItemEvents.tooltip(e => {

        world_collection.forEach(r => {
            e.addAdvanced(r, (item, advanced, text) => {
            if (e.shift) {
                addShiftTooltip(text, [
                    createalienTopLine(),
                    Text.literal(''),
                    '✿§1现§9在§2你§3可§l以§5在§cM§fV§2时§8期§3直§6接§e制§9作§4大§c碎§5采§9！§f✿',
                    Text.literal(''),
                    '✿§1往§9事§2总§3在§5回§c忆§f时§2被§8赋§3予§6意§e义§f✿',
                    '✿§9当§1风§6再§e次§2拂§d过§5十§c八§f岁§3少§b年§4的§a心§8里§f✿',
                    '✿§3返§5回§c到§f当§2年§8的§3夕§6阳§e时§9§f✿',
                    '✿§4看§1一§9看§2曾§3经§5的§c悲§c欢§f和§2忧§8乐§3§f✿',
                    createalienTopLine()
                ])
            } else {
                addShiftTooltip(text, [
                    createalienTopLine(),
                    Text.literal(''),
                    createAlienText(),
                    Text.literal(''),
                    createalienTopLine()
                ])
            }
        })
    })
        hvItems.forEach(r => {
            e.addAdvanced(r, (item, advanced, text) => {
                if (e.shift) {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§1现§9在§2你§3可§l以§5在§cH§fV§2时§8期§3直§6接§e制§9作§4！§f✿',
                        Text.literal(''),
                        createalienTopLine(),
                    ])
                }
             else {
                addShiftTooltip(text, [
                    createalienTopLine(),
                    Text.literal(''),
                    createAlienText(),
                    Text.literal(''),
                    createalienTopLine()
                    ])
                }
            })
        })
        ivItems.forEach(r => {
            e.addAdvanced(r, (item, advanced, text) => {
                if (e.shift) {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§1现§9在§2你§3可§l以§5在§cE§fV§2时§8期§3直§6接§e制§9作§4！§f✿',
                        '✿§4并§9且§c可§8以§e在§2高§7压§4釜§b获§d得§5材§c料§f✿',
                        Text.literal(''),
                        createalienTopLine()
                    ])
                } else {
                    addShiftTooltip(text, [
                        Text.literal('  §3▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁'),
                        Text.literal(''),
                        createAlienText(),
                        Text.literal(''),
                        Text.literal('  §3▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
                    ])
                }
            })
        })
        reRocket.forEach(r => {
            e.addAdvanced(r, (item, advanced, text) => {
                if (e.shift) {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§1可§9以§2放§3在§l提§5取§c机§f里§2提§8取§3出§6燃§e料§4！§f✿',
                        Text.literal(''),
                        '✿§6先§a有§d鸡§2还§l是§e先§8有§b蛋§c？§f✿',
                        '✿§4大§7概§1是§c先§l有§9鸡§3蛋§f✿',
                        '✿§e后§8有§2蛋§5鸡§f✿',
                        '✿§b不§4过§6我§a更§l喜§3欢§7成§9熟§d的§1肉§e鸡§f✿',
                        '✿§5V§8我§c§7五§l十§2立§d马§9送§4你§e创§1箱§a！§b！§c！§f✿',
                        Text.literal(''),
                        createalienTopLine()
                    ])
                } else {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        createAlienText(),
                        Text.literal(''),
                        createalienTopLine()
                    ])
                }
            })
        })
        scrubber.forEach(r => {
            e.addAdvanced(r, (item, advanced, text) => {
                if (e.shift) {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§6我§3想§9你§1应§l该§5知§c道§e它§2能§8在§4空§b气§d净§7化§5器§f中§c运§e作§f✿',
                        Text.literal(''),
                        '✿§a什§7么§4？§e你§l问§9我§3什§6么§d是§2空§b气§8净§1化§c器§e？§f✿',
                        '✿§6哇§c，§e我§8真§l该§3好§7好§1惩§9罚§b你§d了§a！§f✿',
                        '✿§9这§4就§e把§6你§l派§b遣§8到§3格§c雷§1新§7视§d野§2部§a门§f✿',
                        '✿§c罚§1你§7狂§9吸§l一§e氧§4化§6碳§a和§8辐§3射§b空§d气§f✿',
                        Text.literal(''),
                        createalienTopLine()
                    ])
                } else {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        createAlienText(),
                        Text.literal(''),
                        createalienTopLine()
                    ])
                }
            })
        })
        air_scrubber.forEach(r => {
            e.addAdvanced(r, (item, advanced, text) => {
                if (e.shift) {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§6曾§a经§d的§2天§9才§c净§7化§4器§f✿',
                        '✿§b已§e沦§3落§9为§a被§c人§6看§2不§8起§d的§7废§4物§f✿',
                        Text.literal(''),
                        '✿§4蓝§8外§e一§2直§9相§c信§f✿',
                        '✿§a你§c会§6站§2在§9格§e雷§4的§d的§7巅§3峰§f✿',
                        '✿§e到§3时§6没§9落§2的§c小§4机§7器§f✿',
                        '✿§c会§e因§4为§2你§8而§d再§6次§3屹§9立§a大§7陆§f✿',
                        Text.literal(''),
                        createalienTopLine()
                    ])
                } else {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        createAlienText(),
                        Text.literal(''),
                        createalienTopLine()
                    ])
                }
            })
        })

        e.addAdvanced('gtceu:primitive_void_ore', (item, advanced, text) => {
            if (e.shift) {
                addShiftTooltip(text, [
                    createalienTopLine(),
                    Text.literal(''),
                    '✿§c现§6在§e你§a可§l以§b用§9熔§3岩§d产§5金§d属§c粉§f和§7化§4学§c气§e体§f✿',
                    Text.literal(''),
                    '✿§a第§7一§4挥§9 §l让§c雨§e之§2起§6源§3为§d之§8震§b颤§f✿',
                    '✿§6第§2二§e挥§a §4令§9海§c之§8怒§b意§2尽§7数§d臣§3服§f✿',
                    '✿§c第§b三§7度§f恩§4泽§9降§c临§8时§f✿',
                    '✿§7暂§3借§a这§e方§f寸§4尘§9世§c栖§8身§f✿',
                    '✿§e以§4魔§8法§f之§2援§6手§c环§7抱§b四§9方§f✿',
                    '✿§b不§4休§9之§c王§8 §l劳§7作§a之§e王§f✿',
                    '✿§4直§9至§c人§8之§b庭§4园§6臻§7至§a完§e满§f✿',
                    '✿§9彻§c夜§8通§b明§4时§6洞§7悉§a世§e间§2星§3辰§f✿',
                    '✿§c再§8度§e拂§4晓§9际§7聆§6听§b太§2阳§3颂§a歌§f✿',
                    '✿§8三§b界§4原§9野§c上§6化§e身§2为§7万§a物§d之§b父§f✿',
                    '✿§4四§9柱§c擎§8天§e处§2支§7撑§a起§6苍§b穹§3寰§d宇§f✿',
                    Text.literal(''),
                    createalienTopLine()
                ])
            } else {
                addShiftTooltip(text, [
                    createalienTopLine(),
                    Text.literal(''),
                    createAlienText(),
                    Text.literal(''),
                    createalienTopLine()
                ])
            }
        })


        e.addAdvanced('gtceu:alloy_blast_smelter', (item, advanced, text) => {
            if (e.shift) {
                if (e.ctrl) {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§6现§a在§d你§2可§9以§c在§7更§4早§b的§d时§5期§f制§c作§e合§4金§6冶§7练§a炉§f✿',
                        '✿§4并§9且§c可§8以§e离§2心§7获§4取§b搭§d建§5方§c块§f✿',
                        '✿§4所§9有§c产§8出§e都§2可§7反§4熵§b离§d心§5出§f原§c材§e料§f✿',
                        Text.literal(''),
                        '✿§a玄§b雾§3凝§c芒§8，§9古§2燧§6逆§1纲§f✿',
                        '✿§d熵§e潮§4啮§7宇§3，§8微§1息§9拒§a亡§f✿',
                        '✿§5天§2枢§6倾§c仄§1，§d星§7骸§3凝§8霜§f✿',
                        '✿§a宏§9穹§7藏§b幽§4，§2微§e尘§6载§3芒§f✿',
                        '✿§e微§5丝§8缠§d玄§1，§c键§7锁§2幽§b光§f✿',
                        '✿§6逆§9熵§3承§a契§2，§d浊§e世§7凝§1芒§f✿',
                        '✿§3火§4锻§9古§2铜§7，§a今§5尘§1曜§8苍§f✿',
                        '✿§6熵§3殇§9渐§d弭§8，§b序§7脉§5延§2昌§f✿',
                        '✿§d未§c途§e织§8络§1，§4虚§3粒§7腾§9扬§f✿',
                        '✿§e古§2燧§9传§5光§7，§8未§1序§3昭§6光§f✿',
                        '✿§a气§5凝§8为§e律§2，§9玄§6火§4烹§c熵§f✿',
                        '✿§d古§8今§5一§2息§7，§c逆§4熵§3为§9章§f✿',
                        Text.literal(''),
                        createalienTopLine()
                    ])
                } else {
                    addShiftTooltip(text, [
                        createalienTopLine(),
                        Text.literal(''),
                        '✿§6现§a在§d你§2可§9以§c在§7更§4早§b的§d时§5期§f制§c作§e合§4金§6冶§7练§a炉§f✿',
                        Text.literal(''),
                        '✿§4熔§9炼§c之§8火§e永§2不§7熄§f✿',
                        '✿§3金§6属§9之§a歌§d在§2高§b炉§8中§5回§c荡§f✿',
                        createalienTopLine(),
                        Text.literal(''),
                        '✿        §9按住§eSHIFT+CTRL§9查看§4更多内容§f       ✿',
                        Text.literal(''),
                        createalienTopLine()
                    ])
                }
            }else{
                addShiftTooltip(text, [
                    createalienTopLine(),
                    Text.literal(''),
                    createAlienText(),
                    Text.literal(''),
                    createalienTopLine()
                ])
            }
            
        })
    })

/**
 * 
 * ### 1. 为物品添加动态提示触发
首先，你需要使用 ItemEvents.modifyTooltips 为物品添加动态提示的触发条件：
 * ItemEvents.modifyTooltips(event => {
  // 当按下 ALT 键时，显示 'mod_id' 动态提示
  event.modifyAll({alt: true}, tooltip => {
    tooltip.dynamic('mod_id')
  })
})
  ### 2. 定义动态提示内容
然后，使用 ItemEvents.dynamicTooltips 定义动态提示的具体内容：
  ItemEvents.dynamicTooltips('mod_id', event => {
  // 向提示添加模组名称
  event.add(Text.blue(Platform.getInfo(event.item.mod).name))
})
## 高级用法
### 1. 基于物品属性的动态文字
你可以根据物品的属性显示不同的动态文字：
ItemEvents.modifyTooltips(event => {
  event.modifyAll(tooltip => {
    tooltip.dynamic('item_info')
  })
})

ItemEvents.dynamicTooltips('item_info', event => {
  const item = event.item
  event.add(Text.yellow(`物品ID: ${item.id}`))
  event.add(Text.green(`物品数量: ${item.count}`))
  event.add(Text.red(`物品耐久: ${item.maxDamage - item.damage}/${item.maxDamage}`))
})
### 2. 基于游戏状态的动态文字
你可以根据游戏状态显示动态文字，例如玩家背包中的物品数量：
ItemEvents.modifyTooltips(event => {
  event.modify('minecraft:diamond', tooltip => {
    tooltip.dynamic('diamond_count')
  })
})

ItemEvents.dynamicTooltips('diamond_count', event => {
  const player = event.player
  if (player) {
    const diamondCount = player.inventory.count('minecraft:diamond')
    event.add(Text.gold(`背包中的钻石数量: ${diamondCount}`))
  }
})
3. 基于时间的动态文字
ItemEvents.modifyTooltips(event => {
  event.modify('minecraft:clock', tooltip => {
    tooltip.dynamic('current_time')
  })
})

ItemEvents.dynamicTooltips('current_time', event => {
  const world = event.level
  if (world) {
    const time = world.getTimeOfDay()
    const hours = Math.floor((time % 24000) / 1000)
    const minutes = Math.floor(((time % 1000) / 1000) * 60)
    event.add(Text.aqua(`当前时间: ${hours}:${minutes.toString().padStart(2, '0')}`))
  }
})
实际应用示例
// 在 startup_scripts 中注册物品
StartupEvents.registry('item', event => {
  event.create('my_dynamic_item')
    .displayName('动态物品')
    .texture('kubejs:item/my_dynamic_item')
})

// 在 client_scripts 中添加动态提示
ItemEvents.modifyTooltips(event => {
  event.modify('kubejs:my_dynamic_item', tooltip => {
    tooltip.dynamic('my_dynamic_info')
  })
})

ItemEvents.dynamicTooltips('my_dynamic_info', event => {
  // 生成随机值作为示例
  const randomValue = Math.floor(Math.random() * 100)
  event.add(Text.lightPurple(`随机属性值: ${randomValue}`))
  
  // 显示玩家信息
  const player = event.player
  if (player) {
    event.add(Text.green(`持有者: ${player.name.string}`))
  }
})
 */

})()