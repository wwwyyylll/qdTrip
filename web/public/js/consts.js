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
            ordinary1:{
                '1':'【有效】',
                '2':'【无效】'
            },
            goodsStatus:{
                '1':'<span style="color:green">上架</span>',
                '2':'<span style="color:red">下架</span>',
                '3':'<span style="color:orange">已删除</span>'
            },
            orderStatus:{
                '1':'<span style="color:orange">待支付</span>',
                '2':'<span style="color:green">已支付</span>',
                '3':'<span style="color:red">已发货</span>',
                '4':'<span style="color:green">已完成</span>',
                '5':'<span style="color:red">已关闭</span>',
                '6':'<span style="color:gray">已取消</span>',
                '7':'<span style="color:green">提交供应商</span>',
                '8':'<span style="color:red">申请退款</span>'
            },
            orderLogStatus:{
                '1':'<span style="color:orange">待支付</span>',
                '2':'<span style="color:green">已支付</span>',
                '3':'<span style="color:red">已发货</span>',
                '4':'<span style="color:green">已完成</span>',
                '5':'<span style="color:red">已退款</span>',
                '6':'<span style="color:gray">已取消</span>',
                '7':'<span style="color:green">提交供应商</span>',
                '8':'<span style="color:red">申请退款</span>'
            },
            userType:{
                '1':'用户',
                '2':'管理员',
                '3':'系统'
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
                '2':'<span style="color:red">下架</span>'
            },
            goodsText:{
                '1':'有效',
                '2':'无效'
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
                '3':'<span style="color:hotpink">已收录</span>',
                '4':'<span style="color:red">审核不通过</span>'
            },
            haveCoupon:{
                '-1':'',
                '1':'<span style="color:green">有</span>',
                '2':'<span style="color:red">无</span>'
            },
            anchorType:{
                '1':'<span style="color:green">带货平台</span>',
                '2':'<span style="color:orange">主播性质</span>'
            },
            guestBook:{
                '1':'<span style="color:red">待回复</span>',
                '2':'<span style="color:green">已回复</span>'
            },
            isRead:{
                '1':'<span style="color:green">已读</span>',
                '2':'<span style="color:red">未读</span>'
            },
            ranking:{
                '1':'<span style="color:red">抖音</span>',
                '2':'<span style="color:orange">淘宝</span>'
            },
            indexPosition:{
                '1':'<span style="color:red">【左一】</span>',
                '3':'<span style="color:orange">【左二】</span>',
                '2':'<span style="color:green">【右一】</span>',
                '4':'<span style="color:blue">【右二】</span>'
            }
        }
    }
});