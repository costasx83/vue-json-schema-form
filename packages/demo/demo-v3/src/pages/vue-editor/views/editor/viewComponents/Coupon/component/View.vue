<template>
    <div :class="$style.box">
        <p
            :class="$style.item"
            class="viewEmpty_IconBox"
        >
            <v-icon size="70">mdi-ticket</v-icon>
        </p>
    </div>
</template>

<script>
export default {
    name: 'CouponView',
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style module>
    @import 'demo-common/css/variable.css';
    .box {
        padding: 20px;
        background-color: #FFFFFF;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 160px;
        font-size: 70px !important;
        background-color: var(--background-color-selected);
    }
</style>
