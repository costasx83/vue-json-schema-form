/**
 * Created by Liu.Jun on 2020/4/30 17:04.
 */

// uiSchema imgItem
export default function genImgItem({
    field = 'LinkImgField',
    width = 580,
    height = 580,
} = { }) {
    return {
        'ui:field': field,
        // 'ui:description': `Width ${width}px, height ${height}px. Supports JPG and PNG image formats, size must not exceed 2 MB.<br>`,
        'ui:options': {
            type: ['jpg', 'jpeg', 'png'],
            size: 2048,
            width,
            height,
            limit: 1
        }
    };
}
