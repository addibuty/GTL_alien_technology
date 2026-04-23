// priority: 10
/**
 * ========================================
 * 蓝色外星人科技
 * ========================================
 * 
 * 作者: [星宸gt]
 * 版本: 1.2.0
 * 
 * 说明:
 * 本脚本用于添加和修改与蓝色外星人科技相关的配方
 * 包含物品合成、机器配方等
 * 
 * 由于你蓝外大人在尝试享用优质私货内容时 却被电压和原版机器配方锁合成而阻拦
 * 感到 肥肠恼火 
 * 于是 便一气之下搬出了外星人科技
 * 将大部分iv大机器提前，甚至部分uv大机器也提前了
 * 并为其配套了iv并行仓新配方
 * 神魔九合一 直接路边
 * 赶在铂处理之前就能享用并行大机器！！！
 * 外星人科技比较发达，所以邻域突破快，有些机器出现的早很合理！
 * 
 * 同时为奇迹增加碎片保底机制和内鬼棉花糖的超时空装配配方
 * 就是要亿点点时间罢了！
 * 当然，当你拿出时光之瓶以八倍电力消耗的富态展现在我面前时，
 * 纵使蓝外大人也只能说："世界属于你！"
 * 
 * ========================================
 */
/**
 * 有bug请私聊a blue alien
 * QQ: 32124424672
 */

// 帮我写下更新日志，扩展其内容，将其润色一下，直接给出新的更新文本就行。
// 版本号为：
// 日期为：
// 更新内容：


// ========================================
// 第一部分：配方修改和添加
// ========================================
(function(){
'use strict'
PlayerEvents.loggedIn(event => {
    const { player } = event
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§b§l欢迎§e§l" + event.player.name + "§b进入游戏§l！")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l正在加载蓝色外星人科技脚本...")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l脚本版本: 1.2.0")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l脚本作者: 星宸gt")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§lQQ: 3212442462")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l合金冶炼反悔配方加载中...")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l正在修改和添加配方...")
    
    if (global.blueAlienStats) {
        player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l✅ 成功转换: " + global.blueAlienStats.successCount)
        player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l  - 纯物品输出: " + global.blueAlienStats.itemOutputCount)
        player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l  - 物品+流体输出: " + global.blueAlienStats.fluidItemOutputCount)
        player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l  - 添加不消耗物品: " + global.blueAlienStats.addedNotConsumable)
        player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l❌ 跳过/失败: " + global.blueAlienStats.skipCount)
    }
    
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l修改成功！")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l添加成功！")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l蓝色外星人科技脚本加载完成！")
    player.tell("")
    player.tell("§a§l[§b§l蓝色外星人科技§a§l]§e§l蓝外大人祝你玩的愉快！")
})

ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu
    const GTValues = Java.loadClass('com.gregtechceu.gtceu.api.GTValues');

    let stats = {
        successCount: 0,
        itemOutputCount: 0,
        fluidItemOutputCount: 0,
        skipCount: 0,
        addedNotConsumable: 0
    }

    // ========================================
    //           合金冶炼炉反悔配方
    // ========================================
    console.log('========================================')
    console.log('开始处理合金冶炼炉反悔配方...')

    event.remove({ id: /^a_blue_alien:reverse_alloy_/ })

    event.forEachRecipe({ type: 'gtceu:alloy_blast_smelter' }, recipe => {
        let jsonStr = recipe.json.toString()
        let json = JSON.parse(jsonStr)

        let itemInputs = []
        let fluidInputs = []
        let fluidOutput = null
        let euValue = 30
        let durationValue = json.duration || 200

        if (json.tickInputs && json.tickInputs.eu && json.tickInputs.eu[0]) {
            euValue = json.tickInputs.eu[0].content || 30
        } else if (json.data && json.data.EUt) {
            euValue = json.data.EUt
        } else if (json.EUt) {
            euValue = json.EUt
        }

        if (json.inputs?.item) {
            for (let entry of json.inputs.item) {let content = entry.content
                if (!content) continue
                if (content.type === 'gtceu:circuit') continue

                let count = content.count || 1
                let ingredient = content.ingredient
                if (ingredient) {
                    if (ingredient.item) {
                        itemInputs.push({ item: ingredient.item, count: count, isTag: false })
                    } else if (ingredient.tag) {
                        itemInputs.push({ tag: ingredient.tag, count: count, isTag: true })
                    }
                }
            }
        }

        if (json.inputs?.fluid) {
            for (let entry of json.inputs.fluid) {
                let content = entry.content
                if (!content) continue
                let amount = content.amount || 1000
                let fluidVal = content.value
                if (fluidVal && fluidVal.length > 0 && fluidVal[0].fluid) {
                    fluidInputs.push({ fluid: fluidVal[0].fluid, amount: amount })
                }
            }
        }

        if (json.outputs?.fluid) {
            for (let entry of json.outputs.fluid) {
                let content = entry.content
                if (!content) continue
                let amount = content.amount || 1000
                let fluidVal = content.value
                if (fluidVal && fluidVal.length > 0 && fluidVal[0].fluid) {
                    fluidOutput = { fluid: fluidVal[0].fluid, amount: amount }
                    break
                }
            }
        }

        if (!fluidOutput) {
            stats.skipCount++
            return
        }

        let safeRecipeId = String(recipe.getId()).replace(/:|\//g, '_')
        let newRecipeId = `a_blue_alien:reverse_alloy_${safeRecipeId}`

        try {
            let hasValidItems = false

            for (let item of itemInputs) {
                if (item.isTag) {
                    let tagItems = Ingredient.of(`#${item.tag}`).getItemIds()
                    if (tagItems && tagItems.length > 0) {
                        hasValidItems = true
                        break
                    }
                } else {
                    hasValidItems = true
                    break
                }
            }

            if (itemInputs.length > 0 && hasValidItems) {
                if (fluidInputs.length > 0) {
                    let builder = gtr.centrifuge(newRecipeId)
                        .inputFluids(`${fluidOutput.fluid} ${fluidOutput.amount}`)
                        .notConsumable('alien:alien0')
                        .EUt(euValue)
                        .duration(durationValue)



                    for (let item of itemInputs) {
                        if (item.isTag) {
                            let tagItems = Ingredient.of(`#${item.tag}`).getItemIds()
                            if (tagItems && tagItems.length > 0) {
                                for (let itemId of tagItems) {
                                    builder = builder.itemOutputs(`${item.count}x ${itemId}`)
                                }
                            }
                        } else {
                            builder = builder.itemOutputs(`${item.count}x ${item.item}`)
                        }
                    }

                    for (let fluid of fluidInputs) {
                        builder = builder.outputFluids(`${fluid.fluid} ${fluid.amount}`)
                    }

                    stats.successCount++
                    stats.itemOutputCount++
                }
            }

        } catch (e) {
            stats.skipCount++
        }
    })

    console.log('========================================')
    console.log('📊 总结:')
    console.log('✅ 成功转换:', stats.successCount)
    console.log('  - 纯物品输出:', stats.itemOutputCount)
    console.log('  - 物品+流体输出:', stats.fluidItemOutputCount)
    console.log('  - 添加不消耗物品:', stats.addedNotConsumable)
    console.log('❌ 跳过/失败:', stats.skipCount)
    console.log('========================================')

    // 保存统计数据到全局变量
    global.blueAlienStats = stats

    // ========================================
    //           组装机配方
    // ========================================
    gtr.assembler('a_blue_alien:heyelianjinlu')
        .itemInputs('1024x minecraft:furnace', '1024x minecraft:blast_furnace', '1024x minecraft:smoker', '256x gtceu:lv_electric_furnace', '64x gtceu:mv_electric_furnace', '256x gtceu:lv_arc_furnace', '64x gtceu:mv_arc_furnace', '256x gtceu:lv_alloy_smelter', '64x gtceu:mv_alloy_smelter')
        .itemOutputs('gtceu:alloy_blast_smelter')
        .duration(114514 * 20)
        .EUt(GTValues.VA[GTValues.LV])

    gtr.assembler('a_blue_alien:ivorhv')
        .itemInputs(Ingredient.of('#gtceu:circuits/ev').withCount(16), '64x gtceu:hv_emitter', '64x gtceu:hv_sensor', '64x gtceu:ev_machine_hull', '64x gtceu:gold_double_cable')
        .itemOutputs('gtceu:iv_parallel_hatch')
        .duration(20)
        .EUt(GTValues.VA[GTValues.HV])

    const largeMachineRecipes = [
        { id: 'dayanmo', output: 'gtceu:large_maceration_tower', machine: 'macerator' },
        { id: 'dajinxi', output: 'gtceu:large_chemical_bath', machine: 'chemical_bath' },
        { id: 'dalixin', output: 'gtceu:large_centrifuge', machine: 'centrifuge' },
        { id: 'dajiaoban', output: 'gtceu:large_mixer', machine: 'mixer' },
        { id: 'dadianjie', output: 'gtceu:large_electrolyzer', machine: 'electrolyzer' },
        { id: 'dadianci', output: 'gtceu:large_electromagnet', machine: 'polarizer' },
        { id: 'dadabao', output: 'gtceu:large_packer', machine: 'packer' },
        { id: 'dazuzhuang', output: 'gtceu:large_assembler', machine: 'assembler' },
        { id: 'dadianluzuzhuang', output: 'gtceu:large_circuit_assembler', machine: 'circuit_assembler' },
        { id: 'dadianhu', output: 'gtceu:large_arc_smelter', machine: 'arc_furnace' },
        { id: 'dajiguang', output: 'gtceu:large_engraving_laser', machine: 'laser_engraver' },
        { id: 'daloushao', output: 'gtceu:large_sifting_funnel', machine: 'sifter' },
        { id: 'dagaoya', output: 'gtceu:large_autoclave', machine: 'autoclave' },
        { id: 'dajiya', output: 'gtceu:large_material_press', machine: 'forming_press' },
        { id: 'daniangzao', output: 'gtceu:large_brewer', machine: 'brewery' },
        { id: 'daqiege', output: 'gtceu:large_cutter', machine: 'cutter' },
        { id: 'dafenliu', output: 'gtceu:large_distillery', machine: 'distillery' },
        { id: 'datiqu', output: 'gtceu:large_extractor', machine: 'extractor' },
        { id: 'dayamo', output: 'gtceu:large_extruder', machine: 'extruder' },
        { id: 'daguhua', output: 'gtceu:large_solidifier', machine: 'fluid_solidifier' },
        { id: 'daxiancai', output: 'gtceu:large_wiremill', machine: 'wiremill' },
        { id: 'dajiqi', output: 'gtceu:large_gas_collector', machine: 'gas_collector' },
    ]

    largeMachineRecipes.forEach(recipe => {
        gtr.assembler(`a_blue_alien:${recipe.id}`)
            .itemInputs(
                Ingredient.of('#gtceu:circuits/ev').withCount(16),
                '64x gtceu:titanium_block',
                `64x gtceu:lv_${recipe.machine}`,
                `64x gtceu:mv_${recipe.machine}`,
                `64x gtceu:hv_${recipe.machine}`,
                `64x gtceu:ev_${recipe.machine}`
            )
            .itemOutputs(recipe.output)
            .duration(114514)
            .EUt(GTValues.VA[GTValues.HV])
    })

    gtr.assembler('a_blue_alien:dasuicai')
        .itemInputs(
            Ingredient.of('#gtceu:circuits/mv').withCount(64),
            'gtceu:ulv_fragment_world_collection_machine',
            '64x gtceu:steel_gearbox',
            '64x gtceu:aluminium_block',
            '16x gtceu:mv_field_generator',
            '16x gtceu:mv_sensor',
            '16x gtceu:mv_robot_arm'
        )
        .inputFluids(Fluid.of('gtceu:vanadium_steel', 11451400))
        .itemOutputs('gtceu:large_fragment_world_collection_machine')
        .duration(114514)
        .EUt(GTValues.VA[GTValues.LV])

    gtr.assembler('a_blue_alien:Only_god')
        .itemInputs(
            '256x gtceu:mv_chemical_bath',
            '64x gtceu:hv_chemical_bath',
            '64x gtceu:ev_chemical_bath',
            '64x gtceu:iv_chemical_bath',
            '256x gtceu:mv_chemical_reactor',
            '64x gtceu:hv_chemical_reactor',
            '64x gtceu:ev_chemical_reactor',
            '64x gtceu:iv_chemical_reactor',
            '16x gtceu:chemical_plant'
        )
        .inputFluids(Fluid.of('gtceu:soldering_alloy', 2147483647))
        .itemOutputs('gtceu:chemical_distort')
        .duration(114514)
        .EUt(GTValues.VA[GTValues.IV])

    //(2**63)-1

    // ========================================
    //            提取机配方
    // ========================================
    gtr.extractor('a_blue_alien:small_black')
        .itemInputs('2147483647x gtlcore:world_fragments_barnarda')
        .outputFluids(Fluid.of('gtceu:miracle', 11451400))
        .duration(114514)
        .EUt(GTValues.VA[GTValues.EV])

    const rocketRecipes = [
        { id: 'ad_rocket1', rocket: 'ad_astra:tier_1_rocket', fluid: 'gtceu:rocket_fuel 10000', tier: 'LV' },
        { id: 'ad_rocket2', rocket: 'ad_astra:tier_2_rocket', fluid: 'gtceu:rocket_fuel_rp_1 10000', tier: 'MV' },
        { id: 'ad_rocket3', rocket: 'ad_astra:tier_3_rocket', fluid: 'gtceu:dense_hydrazine_fuel_mixture 10000', tier: 'HV' },
        { id: 'ad_rocket4', rocket: 'ad_astra:tier_4_rocket', fluid: 'gtceu:rocket_fuel_cn3h7o3 10000', tier: 'EV' },
        { id: 'ad_rocket5', rocket: 'ad_astra_rocketed:tier_5_rocket', fluid: 'gtceu:rocket_fuel_h8n4c2o4 10000', tier: 'IV' },
        { id: 'ad_rocket6', rocket: 'ad_astra_rocketed:tier_6_rocket', fluid: 'ad_astra:cryo_fuel 10000', tier: 'LuV' },
        { id: 'ad_rocket7', rocket: 'ad_astra_rocketed:tier_7_rocket', fluid: 'gtceu:stellar_energy_rocket_fuel 10000', tier: 'ZPM' },
    ]

    rocketRecipes.forEach(recipe => {
        gtr.extractor(`a_blue_alien:${recipe.id}`)
            .notConsumable(`4x ${recipe.rocket}`)
            .outputFluids(recipe.fluid)
            .duration(20 * 20)
            .circuit(24)
            .EUt(GTValues.VA[GTValues[recipe.tier]])
    })

    gtr.extractor('a_blue_alien:ad_rocket8')
        .notConsumable('gtceu:space_elevator')
        .outputFluids('gtceu:barnarda_air 1000000')
        .duration(20 * 20)
        .circuit(24)
        .EUt(GTValues.VA[GTValues.UV])

    // ========================================
    //            超时空装配机配方
    // ========================================
    gtr.suprachronal_assembly_line('a_blue_alien:blue_mole_arshmallow')
        .itemInputs(
            '2147483647x minecraft:command_block',
            '2147483647x minecraft:chain_command_block',
            '2147483647x gtlcore:world_fragments_barnarda',
            '2147483647x gtceu:magnetohydrodynamicallyconstrainedstarmatter_block',
            '100x expatternprovider:fishbig'
        )
        .inputFluids('gtladditions:star_gate_crystal_slurry 2147483647', 'gtceu:miracle 2147483647')
        .itemOutputs('kubejs:heartofthesmogus')
        .duration(2147458)
        .EUt(GTValues.VA[GTValues.MAX] * 2147483647)

    // ========================================
    //            离心机配方
    // ========================================
    gtr.centrifuge('a_blue_alien:processing_pattern')
        .itemInputs('65565x gtceu:stone_dust')
        .itemOutputs('64x gtceu:titanium_dust', '64x gtceu:chromium_dust', '64x gtceu:iron_dust', '64x gtceu:potassium_dust', '64x gtceu:aluminium_dust', '64x gtceu:silicon_dust')
        .outputFluids('gtceu:chlorine 100000', 'gtceu:oxygen 100000', 'gtceu:fluorine 100000', 'gtceu:carbon_dioxide 100000', 'gtceu:sulfur_dioxide 100000', 'gtceu:carbon_monoxide 100000')
        .duration(20)
        .EUt(GTValues.VA[GTValues.LV])

    gtr.centrifuge('a_blue_alien:transcendentmetal')
        .notConsumable('avaritia:infinity_pickaxe')
        .notConsumable('avaritia:infinity_catalyst')
        .inputFluids('gtceu:transcendentmetal 1000')
        .itemOutputs('avaritia:infinity_ingot', 'avaritia:neutron_ingot', 'kubejs:dark_matter')
        .outputFluids('gtceu:crystalmatrix 1000', 'gtceu:cosmicneutronium 1000', 'gtceu:high_energy_quark_gluon_plasma 1000')
        .duration(200)
        .EUt(GTValues.VA[GTValues.OpV])

    // ========================================
    //           高压釜批量系列配方
    // ========================================
    const    autoclaveDismantle = [
        { id: 'large_mixer',itemOutputs: ['gtceu:maraging_steel_300_dust'],outputFluids:['gtceu:molten_hastelloy_x 144'],EUt: GTValues.VA[GTValues.MV],duration: 100 },
        { id: 'large_maceration_tower', itemOutputs: ['gtceu:tungsten_carbide_dust','gtceu:ultimet_dust'], outputFluids:['gtceu:molten_zeron_100 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_chemical_bath', itemOutputs: [], outputFluids:['gtceu:molten_watertight_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_electrolyzer', itemOutputs: ['gtceu:tungsten_dust','gtceu:hsla_steel_dust'], outputFluids:['gtceu:platinum 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'chemical_distort', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:tetrafluoroethylene 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_centrifuge', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:molten_incoloy_ma_956 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_electromagnet', itemOutputs: ['gtceu:tungsten_dust','gtceu:hsla_steel_dust'], outputFluids:['gtceu:platinum 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_packer', itemOutputs: [], outputFluids:['gtceu:molten_tungsten_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_assembler', itemOutputs: ['gtceu:tungsten_dust'], outputFluids:['gtceu:stellite_100 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_circuit_assembler', itemOutputs: ['gtceu:steel_dust','gtceu:stellite_100_dust'], outputFluids:['gtceu:molten_tungsten_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_arc_smelter', itemOutputs: ['gtceu:titanium_carbide_dust','gtceu:hsla_steel_dust'], outputFluids:['gtceu:molten_molybdenum_disilicide 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_engraving_laser', itemOutputs: ['gtceu:steel_dust','gtceu:tungsten_steel_dust'], outputFluids:['gtceu:molten_titanium_tungsten_carbide 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_sifting_funnel', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:molten_incoloy_ma_956 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_autoclave', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:molten_watertight_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_material_press', itemOutputs: ['gtceu:steel_dust','gtceu:stainless_steel_dust'], outputFluids:['gtceu:molten_maraging_steel_300 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_brewer', itemOutputs: ['gtceu:cobalt_brass_dust','gtceu:hsla_steel_dust'], outputFluids:['gtceu:molten_molybdenum_disilicide'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_cutter', itemOutputs: ['gtceu:ultimet_dust','gtceu:tungsten_carbide_dust'], outputFluids:['gtceu:molten_hastelloy_c_276 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_distillery', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:molten_watertight_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_extractor', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:molten_tungsten_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_extruder', itemOutputs: ['gtceu:stainless_steel_dust'], outputFluids:['gtceu:molten_maraging_steel_300 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_solidifier', itemOutputs: ['gtceu:steel_dust'], outputFluids:['gtceu:molten_tungsten_steel 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
        { id: 'large_wiremill', itemOutputs: ['gtceu:stainless_steel_dust'], outputFluids:['gtceu:molten_maraging_steel_300 144'], EUt: GTValues.VA[GTValues.MV], duration: 100 },
    ]
    //const arrID=[{id:'',NotConsumable:['1x id'],itemInputs:['1x id'],notConsumable:['1x id'],inputFluids:['id 1000'],itemOutputs:['1x id'],outputFluids:['id 1000'],EUt:GTValues.VA[GTValues.EV],duration:5x20}]//"1x"代表一个
    //        { id: 'large_mixer', NotConsumable: ['alien:alien1'],inputFluids:['gtceu:titanium 1000'], itemOutputs: [], outputFluids:[],EUt: GTValues.VA[GTValues.MV], duration: 5x20 },
    //        { id: 'large_maceration_tower', NotConsumable: ['alien:alien1'],inputFluids:['gtceu:titanium 1000'], itemOutputs: [], outputFluids:[],EUt: GTValues.VA[GTValues.MV], duration: 5x20 },
    for (let i = 0; i <    autoclaveDismantle.length; i++) {
        let recipe =    autoclaveDismantle[i]
        let builder = gtr.autoclave(`a_blue_alien:dismantle_${recipe.id}`) 
            .notConsumable('alien:alien1')
            .inputFluids('gtceu:titanium 3000')
        
        let currentItem = 'gtceu:' + recipe.id
        
        // 使用当前物品作为 notConsumable
        if (currentItem) {
            builder = builder.notConsumable(currentItem)
        }

        if (recipe.notConsumable && Array.isArray(recipe.notConsumable)) {
            for (let j = 0; j < recipe.notConsumable.length; j++) {
                let input = recipe.notConsumable[j]
                builder = builder.notConsumable(input)
            }
        }        

        if (recipe.itemInputs && Array.isArray(recipe.itemInputs)) {
            for (let j = 0; j < recipe.itemInputs.length; j++) {
                let input = recipe.itemInputs[j]
                builder = builder.itemInputs(input)
            }
        }
        
        if (recipe.itemOutputs && Array.isArray(recipe.itemOutputs)) {
            for (let j = 0; j < recipe.itemOutputs.length; j++) {
                let output = recipe.itemOutputs[j]
                builder = builder.itemOutputs(output)
            }
        }
        
        if (recipe.outputFluids && Array.isArray(recipe.outputFluids)) {
            for (let j = 0; j < recipe.outputFluids.length; j++) {
                let fluid = recipe.outputFluids[j]
                builder = builder.outputFluids(fluid)
            }
        }
        
        builder.EUt(recipe.EUt)
            .duration(recipe.duration)
    }






    // ========================================
    //            化反配方
    // ========================================
    const chemical = ['chemical_reactor', 'large_chemical_reactor']

    chemical.forEach(machine => {
        gtr[machine]('a_blue_alien:nitrogen')
            .itemInputs('64x gtceu:carbon_dust')
            .inputFluids('gtceu:hydrogen 1000', 'gtceu:oxygen 1000', 'gtceu:nitrogen 1000')
            .itemOutputs('gtceu:sodium_hydroxide_dust')
            .outputFluids('gtceu:epoxy 1000')
            .EUt(GTValues.VA[GTValues.EV])
            .circuit(1)
            .duration(200)

        gtr[machine]('a_blue_alien:tritanium_dust')
            .itemInputs('4096x gtceu:titanium_dust', 'alien:alien0')
            .itemOutputs('gtceu:tritanium_dust')
            .EUt(GTValues.VA[GTValues.EV])
            .circuit(1)
            .duration(200)
    })

    gtr.alloy_smelter('a_blue_alien:alloy_smelter_alien0')
        .itemInputs('16384x gtceu:coke_block','16384x gtceu:raw_coal_block')
        .itemOutputs('alien:alien0')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(200)



    // ========================================
    //            其他配方
    // ========================================
    const disk_item = ['256x gtceu:steel_dust', '256x gtceu:wrought_iron_dust', '256x gtceu:diamond_dust', '256x gtceu:lead_dust', '256x gtceu:silver_dust', '256x gtceu:gold_dust', '256x gtceu:nickel_dust', '256x gtceu:iron_dust', '256x gtceu:copper_dust', '256x gtceu:tin_dust', '256x gtceu:coke_dust']
    const disk_fluid = ['gtceu:steam 114514', 'gtceu:oil_heavy 12500', 'gtceu:oil 12500', 'gtceu:oil_light 12500', 'gtceu:oil_medium 12500', 'gtceu:carbon 10000', 'gtceu:naphthalene 10000', 'gtceu:carbon_monoxide 10000', 'gtceu:creosote 10000', 'minecraft:water 10000', 'gtceu:acetone 10000', 'gtceu:methanol 10000', 'gtceu:benzene 10000', 'gtceu:phenol 10000', 'gtceu:acetic_acid 10000', 'gtceu:ammonia 10000', 'gtceu:methyl_acetate 10000', 'gtceu:lightly_steam_cracked_heavy_fuel 37500', 'gtceu:ethylbenzene 10000', 'gtceu:ethylene 10000', 'gtceu:lubricant 10000', 'gtceu:hydrogen 10000', 'gtceu:ethanol 10000', 'gtceu:methane 10000', 'gtceu:dimethylbenzene 10000', 'gtceu:hydrogen_sulfide 10000', 'gtceu:carbon_dioxide 10000', 'gtceu:toluene 10000', 'gtceu:lightly_steam_cracked_light_fuel 37500', 'gtceu:lightly_steam_cracked_naphtha 37500', 'gtceu:steam_cracked_butane 50000', 'gtceu:steam_cracked_fluoro_carbon_lanthanide_slurry 50000', 'gtceu:severely_steam_cracked_heavy_fuel 62500', 'gtceu:steam_cracked_butene 50000', 'gtceu:severely_steam_cracked_gas 62500', 'gtceu:steam_cracked_propane 50000', 'gtceu:steam_cracked_propene 50000', 'gtceu:severely_steam_cracked_light_fuel 62500', 'gtceu:severely_steam_cracked_naphtha 62500', 'gtceu:steam_cracked_butadiene 50000', 'gtceu:steam_cracked_turpentine 50000', 'gtceu:steam_cracked_ethylene 50000', 'gtceu:lightly_steam_cracked_gas 37500', 'gtceu:steam_cracked_ethane 50000']

    gtr.primitive_void_ore('a_blue_alien:disk')
        .inputFluids('minecraft:lava 114514')
        .outputFluids(disk_fluid)
        .itemOutputs(disk_item)
        .duration(200)

    gtr.coke_oven('a_blue_alien:coke')
        .itemInputs('gtceu:raw_coal')
        .itemOutputs('2x gtceu:coke_gem')
        .outputFluids('gtceu:creosote 1000')
        .duration(20)

    gtr.coke_oven('a_blue_alien:diamond')
        .itemInputs('minecraft:diamond')
        .itemOutputs('64x gtceu:coke_gem')
        .outputFluids('gtceu:creosote 12000')
        .duration(20 * 10)

    gtr.pyrolyse_oven('a_blue_alien:pyrolyse_coke')
        .itemInputs('8x gtceu:raw_coal')
        .itemOutputs('16x gtceu:coke_gem')
        .outputFluids('gtceu:creosote 8000')
        .duration(20 * 5)
        .circuit(23)
        .EUt(GTValues.VA[GTValues.LV])

    gtr.pyrolyse_oven('a_blue_alien:pyrolyse_diamond')
        .itemInputs('minecraft:diamond')
        .itemOutputs('64x gtceu:coke_gem')
        .outputFluids('gtceu:creosote 12000')
        .duration(20 * 10)
        .circuit(23)
        .EUt(GTValues.VA[GTValues.LV])

    gtr.pyrolyse_oven('a_blue_alien:pyrolyse_diamond_black')
        .itemInputs('minecraft:diamond_block')
        .itemOutputs('4096x gtceu:coke_gem')
        .outputFluids('gtceu:creosote 120000')
        .duration(20 * 50)
        .circuit(23)
        .EUt(GTValues.VA[GTValues.LV])

    const airScrubberRecipes = [
        {
            id: 'echo_shard',
            notConsumable: '64x minecraft:reinforced_deepslate',
            inputFluid: 'gtceu:barnarda_air 8000',
            itemOutputs: ['64x gtceu:deepslate_dust', '16x minecraft:bone', '4x gtceu:echo_shard_dust'],
            outputFluids: ['gtceu:echo_shard 12000', 'gtceu:unknowwater 12000', 'gtceu:mana 12000'],
            duration: 20 * 20,
            tier: 'EV'
        },
        {
            id: 'lv_gas_collector_air',
            notConsumable: '64x gtceu:lv_gas_collector',
            inputFluid: 'gtceu:air 8000',
            itemOutputs: ['64x gtceu:wrought_iron_dust', '64x gtceu:annealed_copper_dust', '64x gtceu:tin_dust'],
            outputFluids: ['gtceu:nitrogen 12000', 'gtceu:oxygen 12000', 'gtceu:carbon_dioxide 12000'],
            duration: 200,
            tier: 'LV'
        },
        {
            id: 'lv_gas_collector_liquid_air',
            notConsumable: '64x gtceu:lv_gas_collector',
            inputFluid: 'gtceu:liquid_air 8000',
            itemOutputs: ['64x gtceu:ice_dust', '64x gtceu:iron_dust', '64x gtceu:steel_dust'],
            outputFluids: ['gtceu:helium 12000', 'gtceu:argon 12000', 'gtceu:neon 12000'],
            duration: 200,
            tier: 'LV'
        },
        {
            id: 'ev_gas_collector_nether_air',
            notConsumable: '64x gtceu:ev_gas_collector',
            inputFluid: 'gtceu:nether_air 8000',
            itemOutputs: ['64x gtceu:titanium_dust', '64x gtceu:nether_star_dust', '64x gtceu:netherrack_dust'],
            outputFluids: ['gtceu:sulfur_dioxide 12000', 'gtceu:carbon_monoxide 12000', 'gtceu:ozone 12000'],
            duration: 200,
            tier: 'EV'
        },
        {
            id: 'ev_gas_collector_liquid_nether_air',
            notConsumable: '64x gtceu:ev_gas_collector',
            inputFluid: 'gtceu:liquid_nether_air 8000',
            itemOutputs: ['64x gtceu:ice_dust', '64x gtceu:ash_dust', '64x gtceu:gallium_arsenide_dust'],
            outputFluids: ['gtceu:helium_3 12000', 'gtceu:hydrogen_sulfide 12000', 'gtceu:coal_gas 12000'],
            duration: 200,
            tier: 'EV'
        }
    ]

    airScrubberRecipes.forEach(recipe => {
        const builder = gtr.air_scrubber(`a_blue_alien:${recipe.id}`)
            .notConsumable(recipe.notConsumable)
            .inputFluids(recipe.inputFluid)

        recipe.itemOutputs.forEach(output => builder.itemOutputs(output))
        recipe.outputFluids.forEach(fluid => builder.outputFluids(fluid))

        builder.duration(recipe.duration)
            .EUt(GTValues.VA[GTValues[recipe.tier]])
    })
})





})()