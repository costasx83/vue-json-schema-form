<template>
    <GoodsListView
        :line-num="2"
        :line-items="5"
        title="All products"
    ></GoodsListView>
</template>
<script>
import GoodsListView from '../../../components/GoodsListView';

export default {
    name: 'AllGoodsList',
    components: {
        GoodsListView
    },
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
