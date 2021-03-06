import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  footer,
  mainpitch,
  description,
  intro,
  apps,
  contactUs
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`
      }}
    >
      <div
        style={{
          display: "flex",
          height: "150px",
          lineHeight: "1",
          justifyContent: "space-around",
          alignItems: "left",
          flexDirection: "column",
          alignSelf: "center"
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
            alignSelf: "center"
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
            alignItems: "center"
          }}
        >
          {subheading}
        </h3>
        <div
          className="column is-12 has-text-centered"
          style={{
            marginTop: "30px"
          }}
        >
          <Link className="btn" to="/contact">
            {contactUs}
          </Link>
        </div>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="columns is-multiline">
                    <div className="column is-5">
                      <img
                        className="profilePic"
                        src="/img/Alfonso_Martinez_Calle.jpg"
                        alt="Alfonso Martínez Calle"
                      />
                    </div>
                    <div className="column is-6 is-offset-1">
                      <div className="tile">
                        <h1 className="title">{mainpitch.title}</h1>
                      </div>
                      <div className="tile">
                        <h3 className="subtitle">
                          {mainpitch.description &&
                            mainpitch.description.map(({ text }) => (
                              <p>{text}</p>
                            ))}
                        </h3>
                      </div>
                      <div className="has-text-centered">
                        <a
                          className="btn"
                          href="https://www.linkedin.com/in/almcalle/"
                          target="_blank"
                        >
                          Conecta conmigo en Linkedin
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {intro.title}
                    </h3>
                    <p>{intro.description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                {
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      {intro.seeMore && (
                        <Link className="btn" to={intro.seeMoreUrl}>
                          {intro.seeMore}
                        </Link>
                      )}
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
        <div className="content">
          <div className="tile">
            <h3
              className="subtitle"
              style={{
                textAlign: "center"
              }}
            >
              {footer}
            </h3>
          </div>
        </div>
        <div
          className="column is-12 has-text-centered"
          style={{
            marginTop: "30px"
          }}
        >
          <Link className="btn" to="/contact">
            {contactUs}
          </Link>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  apps: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        footer={frontmatter.footer}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        apps={frontmatter.apps}
        contactUs={frontmatter.contactUs}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        contactUs
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        footer
        mainpitch {
          title
          description {
            text
          }
        }
        description
        intro {
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
            url
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
`;
