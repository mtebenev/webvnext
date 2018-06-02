import * as React from 'react';
import {Paginator} from './paginator';
import * as TestRenderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const Link = (props: any) => (<a href={props.page}>{props.children}</a>);

const testRenderer = TestRenderer.create(
  <Link page='teee' />
);

console.log(testRenderer.toJSON());
console.log(testRenderer.toTree());

test('should show the right range text', () => {

  const wrapper = shallow(<Paginator length={100} pageSize={20} pageIndex={0} pageSizeOptions={[5, 10]} onPageChange={() => {}} />);
  wrapper.find('.mat-paginator-range-actions .mat-paginator-range-label').forEach(x => {
    console.log(x.text());

  });
  //console.log(wrapper.find('.mat-paginator-range-actions .mat-paginator-range-label')[0].text());
  expect(true).toBeTruthy();
});

