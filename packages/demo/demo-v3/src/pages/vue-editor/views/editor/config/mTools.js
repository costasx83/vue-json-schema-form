/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// Carousel
import componentPackCarouselImg from '../viewComponentsM/CarouselImg';

// Plain text
import componentPackText from '../viewComponentsM/Text';

// Category bar
import CategoryList from '../viewComponentsM/CategoryList';

// Recommended goods
import RecommendGoods from '../viewComponentsM/RecommendGoods';

// Category bar
import Test from '../viewComponentsM/Test';


/**
 * hidden - Hidden, not displayed in toolbar
 * maxNum Number - Maximum configurable number
 * topDisplay Bool - Display at top
 * bottomDisplay Bool - Display at bottom
 * onlyCanConfig Bool - Can only configure data, cannot delete or copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: 'Image & Text',
        componentList: [{
            title: 'Carousel (Normal Array)',
            maxNum: 2,
            viewWidth: '100%',
            icon: 'el-icon-picture',
            name: 'MCarouselImg',
            componentPack: componentPackCarouselImg
        }, {
            title: 'Plain Text',
            maxNum: 20,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MText',
            componentPack: componentPackText
        }, {
            title: 'Category Bar',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MCategoryList',
            componentPack: CategoryList
        }, {
            title: 'Recommended Goods',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MRecommendGoods',
            componentPack: RecommendGoods
        }, {
            title: 'Test Custom Form',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MTestModule',
            componentPack: Test
        }]
    }
];

export default tools;
