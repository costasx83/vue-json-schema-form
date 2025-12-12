<template>
    <div :class="$style.box">
        <div
            v-if="isNoEmpty"
            :class="$style.content"
        >
            <a
                v-for="(item, index) in formData.imgList"
                :key="index"
                :href="item.imgLink"
                target="_blank"
                class="hover-animation"
            >
                <v-img
                    :src="item.imgUrl"
                    :style="{
                        width: '228px',
                        height: '269px',
                    }"
                    class="hover-animation"
                    cover
                    alt=""
                >
                </v-img>
            </a>
        </div>
        <GoodsListView
            v-else
            :line-num="1"
            :line-items="5"
            title="Multiple images module (5)"
        ></GoodsListView>
    </div>
</template>

<script>
import GoodsListView from '../../components/GoodsListView';

export default {
    name: 'MultipleImg5View',
    components: {
        GoodsListView
    },
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isNoEmpty() {
            return this.formData.imgList.length > 0 && this.formData.imgList[0].imgUrl;
        }
    }
};
</script>

<style module>
    @import 'demo-common/css/variable.css';
    .content {
        height: 269px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
