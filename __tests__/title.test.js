import React from "react";
import { render } from "@testing-library/react";

/*
 * In a sequence to understand the comments more logically.
 * title.test.js is the 1st Testing File
 * info.test.js is the 2nd Testing File
 */

// First, we're warming up with a very basic test to be sure all the Testing Config is setup correctly and working both Locally and at GitHub...

test('add 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

// Next, now testing a Component...
// (Still kind of warming up here a little bit - however, the other file "info.test.js" will test more complex Real Components that are from the App - this is quite interesting, this is very cool.)

// We're using the getByTestId selector so we have to add data-testid here.
const Title = () => <title data-testid="title-component">CI/CD in Gatsby with Jest is pretty amazing!</title>

test("Testing if react component shows the correct title.", function() {

  // Render the title.
  const { getByTestId } = render( <Title /> );

  // We expect the title component to have text content that is the same.
  expect( getByTestId("title-component") ).toHaveTextContent("CI/CD in Gatsby with Jest is pretty amazing!");

});

// Same component but now let's check out some "matchers" and "modifiers" - of which there are several and they can be very useful, the following are good references...
// https://jestjs.io/docs/using-matchers
// https://jestjs.io/docs/expect

test("Testing to make sure if title is not correct that we will know.", function() {

  const { getByTestId } = render( <Title /> );

  // Simply add the .not Modifier to test the inverse.
  // We expect the title component not to have text content that is different from what we set.
  expect( getByTestId("title-component") ).not.toHaveTextContent("This should be different.");

});
