define("consts", function() {
    return {
        host: '@@HOST',
        apiBase: "@@API",
        viewBase: '@@HOST@@VIEW',
        param: {
            linkUserName:'noteConsole',
            linkPassword:'dusid@!#$erff2324fdscs@3!@#$%@!%^$@lw@^%',
            signature:'e81ae1bafdf72b4b2b1a73ce4831e84a'
        },
        status:{
            ordinary:{
                '1':'<span style="color:green">有效</span>',
                '2':'<span style="color:red">无效</span>'
            },
            user:{
                '1':'<span style="color:green">允许登录</span>',
                '2':'<span style="color:red">禁止登录</span>'
            },
            userSource:{
                '1':'<span style="color:green">微信</span>',
                '2':'<span style="color:orange">机器人</span>'
            },
            userDetailSource:{
                '1':'微信',
                '2':'机器人'
            },
            goods:{
                '1':'<span style="color:green">上架</span>',
                '2':'<span style="color:red">下架</span>',
                '3':'<span style="color:orange">售罄</span>'
            },
            goodsText:{
                '1':'有效',
                '2':'无效',
                '3':'售罄'
            },
            source:{
                '1':'<span style="color:red">京东</span>',
                '2':'<span style="color:orange">淘宝</span>'
            },
            shopSource:{
                '1':'<span style="color:red">京东</span>',
                '2':'<span style="color:orange">淘宝</span>'
            },
            shopType:{
                'B':'<span style="color:red">天猫</span>',
                'C':'<span style="color:orange">淘宝</span>'
            },
            message:{
                '1':'<span style="color:orange">待回复</span>',
                '2':'<span style="color:green">已回复</span>'
            },
            isBind:{
                '1':'<span style="color:green">是</span>',
                '2':'<span style="color:red">否</span>'
            },
            syncWay:{
                '1':'<span style="color:green">手动</span>',
                '2':'<span style="color:orange">自动</span>'
            },
            expectAnchorVote:{
                '1':'<span style="color:orange">待审核</span>',
                '2':'<span style="color:green">审核通过</span>',
                '3':'<span style="color:red">审核不通过</span>',
                '4':'<span style="color:hotpink">已收录</span>'
            },
            haveCoupon:{
                '1':'<span style="color:green">有</span>',
                '2':'<span style="color:red">无</span>'
            }
        }
    }
});