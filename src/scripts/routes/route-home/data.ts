
export const productTypeSofa = {
    name: 'sofa'
};

export const design1 = {
    name: 'design1'
};

export const componentTypes = {
    hand: {
        id: 'hand',
        name: 'hand'
    },
    back: {
        id: 'back',
        name: 'back'
    },
    body: {
        id: 'body',
        name: 'body'
    },
    foot: {
        id: 'foot',
        name: 'foot'
    }
};

export const avaliableComponents = [{
    id: 'fm1_design1_back2',
    name: 'fm1_design1_back2',
    obj: `/static/models/sofa/fm1_design1/fm1_design1_back2.obj`,
    mtl: `/static/models/sofa/fm1_design1/fm1_design1_back2.mtl`,
    thumb: '/static/assets/no-image.png',
    componentType: componentTypes.back,
    design: design1
}, {
    id: 'fm1_design1_hands2',
    name: 'fm1_design1_hands2',
    obj: `/static/models/sofa/fm1_design1/fm1_design1_hands2.obj`,
    mtl: `/static/models/sofa/fm1_design1/fm1_design1_hands2.mtl`,
    thumb: '/static/assets/no-image.png',
    componentType: componentTypes.hand,
    design: design1,
    productType: productTypeSofa
}];

export const initComponents = [{
    id: 'fm1_design1_body1',
    name: 'fm1_design1_body1',
    obj: `/static/models/sofa/fm1_design1/fm1_design1_body1.obj`,
    mtl: `/static/models/sofa/fm1_design1/fm1_design1_body1.mtl`,
    thumb: '/static/assets/no-image.png',
    componentType: componentTypes.body,
    design: design1,
    productType: productTypeSofa
}, {
    id: 'fm1_design1_foots1',
    name: 'fm1_design1_foots1',
    obj: `/static/models/sofa/fm1_design1/fm1_design1_foots1.obj`,
    mtl: `/static/models/sofa/fm1_design1/fm1_design1_foots1.mtl`,
    thumb: '/static/assets/no-image.png',
    componentType: componentTypes.foot,
    design: design1,
    productType: productTypeSofa
}, {
    id: 'fm1_design1_hands1',
    name: 'fm1_design1_hands1',
    obj: `/static/models/sofa/fm1_design1/fm1_design1_hands1.obj`,
    mtl: `/static/models/sofa/fm1_design1/fm1_design1_hands1.mtl`,
    thumb: '/static/assets/no-image.png',
    componentType: componentTypes.hand,
    design: design1,
    productType: productTypeSofa
}, {
    id: 'fm1_design1_back1',
    name: 'fm1_design1_back1',
    obj: `/static/models/sofa/fm1_design1/fm1_design1_back1.obj`,
    mtl: `/static/models/sofa/fm1_design1/fm1_design1_back1.mtl`,
    thumb: '/static/assets/no-image.png',
    componentType: componentTypes.back,
    design: design1,
    productType: productTypeSofa
}];

export const allComponents = [
    ...avaliableComponents,
    ...initComponents
];