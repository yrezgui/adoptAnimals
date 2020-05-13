import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { window } from "browser-monads"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import "../components/Home/index.css"
import "./PagesStyles.css"

const archive = props => {
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/animals/all" : `/blog/all/${currentPage - 1}`
  const nextPage = `/animals/all/${currentPage + 1}`

  return (
    <Layout>
      <SEO title="blog" />

      <header>
        <div className="archive__section">
          {/* <div className="archive__hero" style={{backgroundImage:`url(${HeaderImg})`}}></div> */}
          <div className="archive__nav">
            <Link
              to="/animals/all"
              className={
                window.location.href.indexOf("/animals/all") > 0
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              All
            </Link>
            <Link
              to="/category/dogs"
              className={
                window.location.href.indexOf("category/dogs") > 0
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Dogs
            </Link>
            <Link
              to="/category/cats"
              className={
                window.location.href.indexOf("category/cats") > 0
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Cats
            </Link>
            <Link
              to="/category/birds"
              className={
                window.location.href.indexOf("category/birds") > 0
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Birds
            </Link>
            
          </div>
        </div>
      </header>

      <div className="feed">
        {" "}
        {props.data.allContentfulAnimales.edges.map(edge => (
          <div
            className="card"
            key={edge.node.id}
            style={{
              backgroundImage: `linear-gradient(
                        to bottom,
                        rgba(10,10,10,0) 0%,
                        rgba(10,10,10,0) 50%,
                        rgba(10,10,10,0.7) 100%),
                        url(${edge.node.images.fluid.src})`,
            }}
            onClick={() => navigate(`/${edge.node.type}/${edge.node.slug}`)}
          >
            <p className="card__category"> {edge.node.city} </p>
            <p className="card__title"> {edge.node.name} </p>{" "}
          </div>
        ))}{" "}
      </div>

      <div className="pagination">
        <div className="pagination__item">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <div className="arrow__back"></div>
            </Link>
          )}
        </div>
        <div className="pagination__item">
          {!isLast && (
            <Link to={nextPage} rel="next">
              <div className="arrow__next"></div>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default archive

export const pageQuery = graphql`
  query DogsQuery($skip: Int!, $limit: Int!) {
    allContentfulAnimales(
      sort: { fields: [createdAt], order: DESC }
      filter: { node_locale: { eq: "en-US"},type:{eq : "Dogs"} }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          slug
          type
          city
          name
          images {
            fluid(maxWidth: 1200, quality: 85) {
              src
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
