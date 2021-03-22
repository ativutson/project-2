# Intro to Mongoose Referenced Data Lesson Starter Code

<br>
<br>
<br>

## 🚨 Important - Please Read!

Before running this code, you will need to update `./config/database.js`

```js
mongoose.connect('YOUR MONGODB ATLAS CONNECTION URI', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
```

<br>
<br>

As you can see above 👆, this starter code is missing the MongoDB Atlas connection URI it needs to connect to your database.

Grab that from your working code from the previous lesson and replace the placeholder string with that value instead. 😅


<br>
<br>

## What's different about this starter code? 🤷‍♀️

We're making a movie "cast" member into a seperate data entity so we can review referenced relationships.

So, we removed the cast member `input` tag from our movie form and anywhere we need to show movie cast members for now.

<br>
<br>

As an added bonus, we also show the average rating for a movie in the "show page". 😉



<br>
<br>

## Want to see the steps we took?

Sure, here are the steps we took for the refactor 😅:

<br>
<br>
<br>


1) Add a feature to `show.ejs` that shows the average rating:

```html
<% if (movie.reviews.length) { %>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Review</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <!--First let's set up a total variable -->
      <% let total = 0 %>  
      <% movie.reviews.forEach(function(r) { %>
         <!-- We'll aggregate the total ratings -->
        <% total += r.rating %>
        <tr>
          <td><%= r.createdAt.toLocaleDateString() %></td>
          <td><%= r.content %></td>
          <td><%= r.rating %></td>
        </tr>
      <% }); %>
      <!-- Then we'll add this table row element below to show our average rating =) -->
      <tr>
        <td colspan="2"></td>
        <td><strong><%= (total / movie.reviews.length).toFixed(1) %></strong></td>
      </tr>
    </tbody>
  </table>
<% } else { %>
  <h5>No Reviews Yet</h5>
<% } %>
```

<br>
<br>
<br>


2) Remove the "Cast" input tag from `/views/movies/new.ejs`

```html
<form id="new-form" action="/movies" method="POST">
  <label>Title:</label>
  <input type="text" name="title">
  <label>Release Year:</label>
  <input type="text" name="releaseYear">
  <label>MPAA Rating</label>
  <select name="mpaaRating">
    <option value="G">G</option>
    <option value="PG">PG</option>
    <option value="PG-13">PG-13</option>
    <option value="R">R</option>
  </select>
  <label>Now Showing:</label>
  <input type="checkbox" name="nowShowing" checked>
  <input type="submit" value="Add Movie">
</form>
```
<br>
<br>
<br>


3) Remove the `<div>` elements for displaying the movie "Cast" input tag from `/views/movies/show.ejs`

```html
<section id="show-page">
  <div>Title: </div>
  <div><%= movie.title %></div>
  <div>Release Year: </div>
  <div><%= movie.releaseYear %></div>
  <div>Rating: </div>
  <div><%= movie.mpaaRating %></div>
  <div>Now Showing: </div>
  <div><%= movie.nowShowing ? 'Yes' : 'Nope' %></div>
</section>
```

<br>
<br>
<br>


4) Temporarily "comment out" the cast property in the `models/movie.js`

```js
const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  }, mpaaRating: String,
  // cast: [String],
  nowShowing: { type: Boolean, default: false },
  reviews: [reviewSchema]

}, {
  timestamps: true
});
```

<br>
<br>
<br>


5) Remove the following lines from the create action inside of `controllers/movies.js`


```js
if(req.body.cast) {
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');

  if (req.body.cast) req.body.cast = req.body.cast.split(',');
}

```