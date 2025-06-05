import React from 'react'
import './Reviews.style.css';



export const Reviews = () => {

  const reviews = [
    { name: "Nhà phát triển website", review: "Chịu trách nhiệm kiểm thử, kiểm tra giao diện. Đảm bảo giao diện hoạt động bình thường" },
    { name: "Nhà phát triển website", review: "Chịu trách nhiệm về phía Back-end của hệ thống. Xây dựng hệ thống xử lý hoàn chỉnh" },
    { name: "Nhà phát triển website", review: "Chịu trách nhiệm về phía Font-end, xử lý các API cho giao diện" },
    { name: "Nhà phát triển website", review: "Chịu trách nhiệm về thiết kế. Thiết kế giao diện cho browser và dashbroad" }
  ]


  const Review = ({ review }) => {
    return (
      <div class="single-review-item">
        <div class="single-review-icon">
          <img src={review.image} />
        </div>
        <p>
          {review.review}
        </p>
        <h2><a href="#">{review.name}</a></h2>
      </div>
    )

  }
  return (
    <section id="review" class="review">
      <div class="container">
        <div class="title">
          <h2>Những nhà phát triển</h2>
        </div>
        <div class="review-content">
          {reviews.map((review) => (
            <Review review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
