import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

export const reqAddOrUpdateTradeMark = (tradeMark) => {
    // 如果有id 修改
    if(tradeMark.id) {
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        });
    }
    else {
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        });
    }
}

// 删除品牌
export const reqDeletTradeMark = (id) => request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
})