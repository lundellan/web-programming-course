## R1
>Reflection question 1: In most programming languages a complete record for each ingredient would be used, for example: Sallad: {price: 10, foundation: true, protein: false, 2 extra: false, dressing: false, vegan: true, gluten:false, lactose: false} This is not the case in inventory.js, which is common when writing JavaScript code. Why don’t we need to store properties with the value fale in the JavaScript objects?

Since the extra attributes will evaluate to false in Javascript nonetheless. 


## R2 
> Reflection question 2: When will the two examples above give different outputs and why is inherited functions, such as sort() not printed? Hint: enumerable, nonenumerable, and inherited properties.

## A1
> Assignment 1: Write a function that returns the options HTML code of a select box for apart of a salad. Example: makeOptions(imported.inventory, ’foundation’) returns
```Javascript
<option value="Pasta"> Pasta, 10 kr</option>
<option value="Sallad"> Sallad, 10 kr</option> ...
```
> Hint: Use the functions map() and reduce(). Note: You will use this code in lab 2 to render a compose salad form. However then we
> will use JSX, reacts domain specific language for rendering pages. The code will be the ame with the exception for the expression that generate the text.