<template>
    <div :class="$style.box">
        <template v-if="isNoEmpty">
            <v-carousel
                cycle
                height="180"
                hide-delimiters
                show-arrows="hover"
            >
                <v-carousel-item
                    v-for="(item, index) in formData.imgList"
                    :key="index"
                >
                    <a
                        :class="$style.imgitem"
                        :href="item.imgLink"
                        target="_blank"
                    >
                        <v-img
                            class="hover-animation"
                            :class="$style.imgitem_img"
                            :src="item.imgUrl"
                            :style="{
                                width: '100%',
                                height: '180px',
                            }"
                            cover
                            alt=""
                        >
                        </v-img>
                    </a>
                </v-carousel-item>
            </v-carousel>
        </template>

        <div
            v-else
            :class="$style.emptyBox"
        >
            <div>
                <p
                    :class="$style.iconBox"
                    class="viewEmpty_IconBox"
                >
                    <v-icon size="x-large">
                        mdi-image
                    </v-icon>
                </p>
                <p
                    :class="$style.iconBox"
                    class="viewEmpty_IconBox"
                >
                    <v-icon size="x-large">
                        mdi-dots-horizontal
                    </v-icon>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarouselImg',
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isNoEmpty() {
            const { formData } = this;
            return !!(formData.imgList && formData.imgList.length > 0 && formData.imgList[0].imgUrl);
        }
    }
};
</script>

<style module>
    @import 'demo-common/css/variable.css';
    .box {
        background-color: #FFFFFF;
        width: 100%;
    }
    .emptyBox {
        min-height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgitem_img {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
