import React from 'react'

const TestReviewCard = ({ rating, award, review }) => {
  return (
    <div>
      <h1>Movie Reviews by Users:</h1>
      <p>User Rating: { rating }</p>
      <p>User Award: { award }</p>
      <p>User Reviews: { review }</p>
    </div>
  )
}

export default TestReviewCard
