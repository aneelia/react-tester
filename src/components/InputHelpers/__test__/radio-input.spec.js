import React from 'react';
import { RadioInput } from '../RadioGroup';
import { shallow } from 'enzyme';

describe('Radio group input element', () => {
    it('should display passed text option', () => {
        const text = 'My text';
        const inputElement = shallow(
            <RadioInput
                text={text}
                answerID="1"
                name="name"
                onSelectItem={() => {}}
            />
        );
        expect(inputElement.text()).toEqual(text);
    });
});
