const add = (num1, num2) => {
	return num1 + num2;
};

test("adds 1 + 2 to equal 3", () => {
	expect(add(1, 2)).toBe(3);
});
