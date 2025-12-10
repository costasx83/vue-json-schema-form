<template>
    <div style="text-align: right;">
        <div style="margin: -10px 0 10px; text-align: left;color: #999;">
            <p>If exported data is manually modified and then re-imported, import may fail. Also, configuration components are split into fine details for easy import matching to correct results, which may not be worth it, a bit redundant Orz . ...</p>
        </div>
        <el-input
            v-model="importStr"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="Note: Import data format should refer to export data format"
        >
        </el-input>
        <p style="margin-top: 20px;">
            <el-button
                type="primary"
                @click="$emit('onImport', importStr)"
            >
                Import
            </el-button>
        </p>
    </div>
</template>

<script>

export default {
    name: 'ImportSchemaView',
    data() {
        return {
            importStr: ''
        };
    }
};
</script>
