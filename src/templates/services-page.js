import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'

export const IndexPageTemplate = ({
  title,
  description,
  web,
  apps,
  contactUs
}) => (
  <div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {web.title}
                    </h3>
                    <p>{web.description}</p>
                  </div>
                </div>
                <Features gridItems={web.blurbs} />
                {
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      {(web.seeMore) && (
                        <Link className="btn" to={web.seeMoreUrl}>
                          {web.seeMore}
                        </Link>)}
                      </div>
                    </div>
                }
              {
                //   <div className="column is-12">
                //   <h3 className="has-text-weight-semibold is-size-2">
                //     Latest stories
                //   </h3>
                //   <BlogRoll />
                //   <div className="column is-12 has-text-centered">
                //     <Link className="btn" to="/blog">
                //       Read more
                //     </Link>
                //   </div>
                // </div>
              }
              <div className="columns">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {apps.title}
                  </h3>
                  <p>{apps.description}</p>
                </div>
              </div>
              <Features gridItems={apps.blurbs} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="tile">
          <h3 className="subtitle">{footer}</h3>
        </div>
      </div>
      <div
        className="column is-12 has-text-centered"
        style={{
          marginTop: '30px'
        }}
        >
        <Link className="btn" to="/contact">
          {contactUs}
        </Link>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  apps: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        web={frontmatter.web}
        apps={frontmatter.apps}
        contactUs={frontmatter.contactUs}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        contactUs
        web {
          title
          description
          blurbs {
            title
            text
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          heading
          description
        }
        apps {
          title
          description
          blurbs {
            title
            text
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }

    }
  }
`
