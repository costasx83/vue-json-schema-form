<template>
    <div :class="$style.box">
        <h2>
            {{ formData.txt || 'Please configure title' }}
        </h2>
    </div>
</template>

<script>
export default {
    name: 'TextView',
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style module>
    .box {
        background-color: #FFFFFF;
        h2 {
            text-align: center;
            font-size: 20px;
            padding: 20px 10px;
            font-weight: bold;
        }
    }
</style>
