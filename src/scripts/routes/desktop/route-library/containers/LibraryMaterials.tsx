import * as React from 'react';

import { Container } from '@/components';

import { MetarialTypeSelect } from './library-materials';
import { MetarialList } from './library-materials/MaterialList';

export interface LibraryMaterialsProps {
}

export class LibraryMaterials extends React.PureComponent<LibraryMaterialsProps> {
    public render() {
        return (
            <div>
                <Container>
                    <MetarialTypeSelect />
                    <MetarialList onSelect={() => null} />
                </Container>
            </div>
        );
    }
}
