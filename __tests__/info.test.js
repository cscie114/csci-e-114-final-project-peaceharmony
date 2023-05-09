import React from "react";
import { create } from "react-test-renderer";
import Info from "../src/components/info.js";  // Real App Component

/*
 * In a sequence to understand the comments more logically.
 * title.test.js is the 1st Testing File
 * info.test.js is the 2nd Testing File
 */

// *** Snapshot Testing ***
// https://jestjs.io/docs/snapshot-testing

// Button...
// This is static, will not change, we know this will pass every time.
// This is simply a basic React Component test -- to make sure React Component Testing is functioning as it should.
function Button(props) {
  return <button>Original Button Component</button>;
}

// Now a Button Component Snapshot.
describe("Button Component", () => {
  test("Button Matches Snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

// Info...
// Now let's test Info which is a Real Component for this App and it can also be dynamic depending on the prop that we pass in.
// However for testing we'll always pass in "top" and then this will stay static and should always pass after creating the original snapshot - unless something changes the code of the original Info Component (that we had not intended) and then we actually want the test to fail because we would want to know about it.
// Also, opening the file info.test.js.snap from inside the __snapshots__ folder will show us the original snapshots if we're interested to check these.
describe("Info Component", function() {
  test("Info Matches Snapshot", function() {
    const info = create(<Info pageSection="top"></Info>);
    expect(info.toJSON()).toMatchSnapshot();
  });
});
 
 
 
