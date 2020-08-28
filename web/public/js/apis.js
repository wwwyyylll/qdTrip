define("apis", function() {
    return {
        login:{
            login:{
                c:'login',
                a:'login'
            },
            isLogin:{
                c:'login',
                a:'isLogin'
            }
        },
        category:{
            getLists:{
                c:'category',
                a:'getLists'
            },
            create:{
                c:'category',
                a:'create'
            },
            getById:{
                c:'category',
                a:'getById'
            },
            updateById:{
                c:'category',
                a:'updateById'
            },
            onById:{
                c:'category',
                a:'onById'
            },
            offById:{
                c:'category',
                a:'offById'
            }
        },
        shop:{
            getLists:{
                c:'shop',
                a:'getLists'
            },
            create:{
                c:'shop',
                a:'create'
            },
            getById:{
                c:'shop',
                a:'getById'
            },
            updateById:{
                c:'shop',
                a:'updateById'
            },
            offById:{
                c:'shop',
                a:'offById'
            },
            onById:{
                c:'shop',
                a:'onById'
            }
        },
        goods:{
            getLists:{
                c:'goods',
                a:'getLists'
            },
            create:{
                c:'goods',
                a:'create'
            },
            getById:{
                c:'goods',
                a:'getById'
            },
            updateById:{
                c:'goods',
                a:'updateById'
            },
            onById:{
                c:'goods',
                a:'onById'
            },
            offById:{
                c:'goods',
                a:'offById'
            },
            soldOutById:{
                c:'goods',
                a:'soldOutById'
            },
            delById:{
                c:'goods',
                a:'delById'
            },
            getMaxSortByDateId:{
                c:'goods',
                a:'getMaxSortByDateId'
            },
            importFromExcel:{
                c:'goods',
                a:'importFromExcel'
            },
            syncById:{
                c:'goods',
                a:'syncById'
            },
            autoSyncById:{
                c:'goods',
                a:'autoSyncById'
            },
            handSyncById:{
                c:'goods',
                a:'handSyncById'
            },
            getPwdById:{
                c:'goods',
                a:'getPwdById'
            }
        },
        expectAnchorVote:{
            getLists:{
                c:'expectAnchorVote',
                a:'getLists'
            },
            getById:{
                c:'expectAnchorVote',
                a:'getById'
            },
            passById:{
                c:'expectAnchorVote',
                a:'passById'
            },
            noPassById:{
                c:'expectAnchorVote',
                a:'noPassById'
            },
            usedById:{
                c:'expectAnchorVote',
                a:'usedById'
            },
            update:{
                c:'expectAnchorVote',
                a:'update'
            }
        },
        expectAnchorVoteUser:{
            getLists:{
                c:'expectAnchorVoteUser',
                a:'getLists'
            }
        },
        categoryRelation:{
            getLists:{
                c:'categoryRelation',
                a:'getLists'
            },
            getById:{
                c:'categoryRelation',
                a:'getById'
            },
            updateById:{
                c:'categoryRelation',
                a:'updateById'
            }
        },
        searchTaobaoKeywords:{
            getLists:{
                c:'searchTaobaoKeywords',
                a:'getLists'
            },
            getItemByKeywordsId:{
                c:'searchTaobaoKeywords',
                a:'getItemByKeywordsId'
            }
        },
        img:{
            uploadImg:{
                c:'img',
                a:'uploadImage'
            },
            uploadForBase64:{
                c:'img',
                a:'uploadForBase64'
            }
        },
        anchor:{
            getLists:{
                c:'anchor',
                a:'getLists'
            },
            getAllLists:{
                c:'anchor',
                a:'getAllLists'
            },
            create:{
                c:'anchor',
                a:'create'
            },
            getById:{
                c:'anchor',
                a:'getById'
            },
            updateById:{
                c:'anchor',
                a:'updateById'
            },
            offById:{
                c:'anchor',
                a:'offById'
            },
            onById:{
                c:'anchor',
                a:'onById'
            },
            updMaxGoodsDateById:{
                c:'anchor',
                a:'updMaxGoodsDateById'
            },
            batchUpdMaxGoodsDate:{
                c:'anchor',
                a:'batchUpdMaxGoodsDate'
            }
        },
        tag:{
            getLists:{
                c:'tag',
                a:'getLists'
            },
            create:{
                c:'tag',
                a:'create'
            },
            getById:{
                c:'tag',
                a:'getById'
            },
            updateById:{
                c:'tag',
                a:'updateById'
            },
            offById:{
                c:'tag',
                a:'offById'
            },
            onById:{
                c:'tag',
                a:'onById'
            }
        },
        anchorGoodsDate:{
            getLists:{
                c:'anchorGoodsDate',
                a:'getLists'
            },
            create:{
                c:'anchorGoodsDate',
                a:'create'
            },
            getById:{
                c:'anchorGoodsDate',
                a:'getById'
            },
            updateById:{
                c:'anchorGoodsDate',
                a:'updateById'
            },
            offById:{
                c:'anchorGoodsDate',
                a:'offById'
            },
            onById:{
                c:'anchorGoodsDate',
                a:'onById'
            },
            sendNotice:{
                c:'anchorGoodsDate',
                a:'sendNotice'
            }
        },
        anchorCompleteRecord:{
            getLists:{
                c:'anchorCompleteRecord',
                a:'getLists'
            },
            save:{
                c:'anchorCompleteRecord',
                a:'save'
            },
            getById:{
                c:'anchorCompleteRecord',
                a:'getById'
            }
        },
        rankingCompleteRecord:{
            getLists:{
                c:'rankingCompleteRecord',
                a:'getLists'
            },
            save:{
                c:'rankingCompleteRecord',
                a:'save'
            },
            getById:{
                c:'rankingCompleteRecord',
                a:'getById'
            }
        },
        goodsSoldOutSign:{
            getLists:{
                c:'goodsSoldOutSign',
                a:'getLists'
            },
            replyById:{
                c:'goodsSoldOutSign',
                a:'replyById'
            }
        },
        goodsClickStat:{
            getLists:{
                c:'goodsClickStat',
                a:'getLists'
            }
        },
        rankingClickStat:{
            getLists:{
                c:'rankingClickStat',
                a:'getLists'
            }
        },
        admin:{
            getLists:{
                c:'admin',
                a:'getLists'
            },
            create:{
                c:'admin',
                a:'create'
            },
            getById:{
                c:'admin',
                a:'getById'
            },
            updateById:{
                c:'admin',
                a:'updateById'
            },
            onById:{
                c:'admin',
                a:'onById'
            },
            offById:{
                c:'admin',
                a:'offById'
            }
        },
        searchSystemKeywords:{
            getLists:{
                c:'searchSystemKeywords',
                a:'getLists'
            },
            create:{
                c:'searchSystemKeywords',
                a:'create'
            },
            getById:{
                c:'searchSystemKeywords',
                a:'getById'
            },
            updateById:{
                c:'searchSystemKeywords',
                a:'updateById'
            },
            onById:{
                c:'searchSystemKeywords',
                a:'onById'
            },
            offById:{
                c:'searchSystemKeywords',
                a:'offById'
            }
        },
        user:{
            getLists:{
                c:'user',
                a:'getLists'
            },
            getById:{
                c:'user',
                a:'getById'
            },
            disableLoginById:{
                c:'user',
                a:'disableLoginById'
            },
            allowLoginById:{
                c:'user',
                a:'allowLoginById'
            }
        },
        distributors:{
            getLists:{
                c:'distributors',
                a:'getLists'
            },
            create:{
                c:'distributors',
                a:'create'
            },
            getById:{
                c:'distributors',
                a:'getById'
            },
            updateById:{
                c:'distributors',
                a:'updateById'
            },
            onById:{
                c:'distributors',
                a:'onById'
            },
            offById:{
                c:'distributors',
                a:'offById'
            }
        },
        warn:{
            getLists:{
                c:'warn',
                a:'getLists'
            }
        },
        guestbook:{
            getLists:{
                c:'guestbook',
                a:'getLists'
            },
            replyById:{
                c:'guestbook',
                a:'replyById'
            }
        },
        ranking:{
            getLists:{
                c:'ranking',
                a:'getLists'
            },
            create:{
                c:'ranking',
                a:'create'
            },
            getById:{
                c:'ranking',
                a:'getById'
            },
            updateById:{
                c:'ranking',
                a:'updateById'
            },
            onById:{
                c:'ranking',
                a:'onById'
            },
            offById:{
                c:'ranking',
                a:'offById'
            }
        },
        rankingGoods:{
            importFromExcel:{
                c:'rankingGoods',
                a:'importFromExcel'
            },
            getLists:{
                c:'rankingGoods',
                a:'getLists'
            },
            getById:{
                c:'rankingGoods',
                a:'getById'
            },
            onById:{
                c:'rankingGoods',
                a:'onById'
            },
            offById:{
                c:'rankingGoods',
                a:'offById'
            },
            delById:{
                c:'rankingGoods',
                a:'delById'
            },
            syncById:{
                c:'rankingGoods',
                a:'syncById'
            },
            autoSyncById:{
                c:'rankingGoods',
                a:'autoSyncById'
            },
            handSyncById:{
                c:'rankingGoods',
                a:'handSyncById'
            },
            getPwdById:{
                c:'rankingGoods',
                a:'getPwdById'
            }
        },
        mallSupplier:{
            getLists:{
                c:'mallSupplier',
                a:'getLists'
            },
            create:{
                c:'mallSupplier',
                a:'create'
            },
            getById:{
                c:'mallSupplier',
                a:'getById'
            },
            updateById:{
                c:'mallSupplier',
                a:'updateById'
            },
            onById:{
                c:'mallSupplier',
                a:'onById'
            },
            offById:{
                c:'mallSupplier',
                a:'offById'
            },
            getConstLists:{
                c:'mallSupplier',
                a:'getConstLists'
            }
        },
        mallExpressFee:{
            getLists:{
                c:'mallExpressFee',
                a:'getLists'
            },
            create:{
                c:'mallExpressFee',
                a:'create'
            },
            getById:{
                c:'mallExpressFee',
                a:'getById'
            },
            updateById:{
                c:'mallExpressFee',
                a:'updateById'
            },
            onById:{
                c:'mallExpressFee',
                a:'onById'
            },
            offById:{
                c:'mallExpressFee',
                a:'offById'
            }
        },
        mallTag:{
            getLists:{
                c:'mallTag',
                a:'getLists'
            },
            create:{
                c:'mallTag',
                a:'create'
            },
            getById:{
                c:'mallTag',
                a:'getById'
            },
            updateById:{
                c:'mallTag',
                a:'updateById'
            },
            onById:{
                c:'mallTag',
                a:'onById'
            },
            offById:{
                c:'mallTag',
                a:'offById'
            }
        },
        mallCategory:{
            getLists:{
                c:'mallCategory',
                a:'getLists'
            },
            create:{
                c:'mallCategory',
                a:'create'
            },
            getById:{
                c:'mallCategory',
                a:'getById'
            },
            updateById:{
                c:'mallCategory',
                a:'updateById'
            },
            onById:{
                c:'mallCategory',
                a:'onById'
            },
            offById:{
                c:'mallCategory',
                a:'offById'
            },
            getConstLists:{
                c:'mallCategory',
                a:'getConstLists'
            },
            getParentLists:{
                c:'mallCategory',
                a:'getParentLists'
            },
            getCategoryLists:{
                c:'mallCategory',
                a:'getCategoryLists'
            }
        },
        mallGoods:{
            getLists:{
                c:'mallGoods',
                a:'getLists'
            },
            create:{
                c:'mallGoods',
                a:'create'
            },
            getById:{
                c:'mallGoods',
                a:'getById'
            },
            updateById:{
                c:'mallGoods',
                a:'updateById'
            },
            onById:{
                c:'mallGoods',
                a:'onById'
            },
            offById:{
                c:'mallGoods',
                a:'offById'
            },
            delById:{
                c:'mallGoods',
                a:'delById'
            },
            getConstLists:{
                c:'mallGoods',
                a:'getConstLists'
            }
        },
        exportExcel:{
            exportOrder:{
                c:'exportExcel',
                a:'exportOrder'
            }
        },
        mallOrder:{
            getLists:{
                c:'mallOrder',
                a:'getLists'
            },
            getById:{
                c:'mallOrder',
                a:'getById'
            },
            getByOrderNo:{
                c:'mallOrder',
                a:'getByOrderNo'
            },
            submitSupplierById:{
                c:'mallOrder',
                a:'submitSupplierById'
            },
            completedById:{
                c:'mallOrder',
                a:'completedById'
            },
            deliveredById:{
                c:'mallOrder',
                a:'deliveredById'
            }
        },
        mallOrderRefundRequest:{
            create:{
                c:'mallOrderRefundRequest',
                a:'create'
            },
            getWaitLists:{
                c:'mallOrderRefundRequest',
                a:'getWaitLists'
            },
            getProcessedLists:{
                c:'mallOrderRefundRequest',
                a:'getProcessedLists'
            },
            handleById:{
                c:'mallOrderRefundRequest',
                a:'handleById'
            }
        },
        mallPrivateMessage:{
            create:{
                c:'mallPrivateMessage',
                a:'create'
            },
            getLists:{
                c:'mallPrivateMessage',
                a:'getLists'
            },
            getByOrderNo:{
                c:'mallPrivateMessage',
                a:'getByOrderNo'
            }
        },
        mallOrderSubmitSupplier:{
            getLists:{
                c:'mallOrderSubmitSupplier',
                a:'getLists'
            }
        },

        role:{
            getLists:{
                c:'role',
                a:'getLists'
            },
            create:{
                c:'role',
                a:'create'
            },
            getById:{
                c:'role',
                a:'getById'
            },
            updateById:{
                c:'role',
                a:'updateById'
            },
            onById:{
                c:'role',
                a:'onById'
            },
            offById:{
                c:'role',
                a:'offById'
            }
        },
        module:{
            getLists:{
                c:'module',
                a:'getLists'
            },
            create:{
                c:'module',
                a:'create'
            },
            getById:{
                c:'module',
                a:'getById'
            },
            updateById:{
                c:'module',
                a:'updateById'
            },
            onById:{
                c:'module',
                a:'onById'
            },
            offById:{
                c:'module',
                a:'offById'
            },
            getControllerLists:{
                c:'module',
                a:'getControllerLists'
            },
            getCaListsByControllerId:{
                c:'module',
                a:'getCaListsByControllerId'
            },
            getConstLists:{
                c:'module',
                a:'getConstLists'
            }
        },
        roleModule:{
            getLists:{
                c:'roleModule',
                a:'getLists'
            },
            create:{
                c:'roleModule',
                a:'create'
            }
        }
    }
});