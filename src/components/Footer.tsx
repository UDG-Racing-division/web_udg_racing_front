import React, { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
// TikTok SVG icon component (lucide-react doesn't have TikTok)
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
import type { SiteSettings } from "../types/api";

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const { translate, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });
  const quickLinks = [
    {
      label: t("footer.quickLinks.team"),
      href: "#team",
    },
    {
      label: t("footer.quickLinks.news"),
      href: "#news",
    },
    {
      label: t("footer.quickLinks.sponsors"),
      href: "#sponsors",
    },
    {
      label: t("footer.quickLinks.about"),
      href: "#about",
    },
    {
      label: t("footer.quickLinks.stats"),
      href: "#stats",
    },
  ];
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/udgracingdivision/",
      label: "Instagram",
    },
    {
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@udgracingdivision",
      label: "TikTok",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/udg-racing-division-1/",
      label: "LinkedIn",
    },
  ];
  const externalLinks = [
    {
      label: t("footer.externalLinks.udgWeb"),
      href: "https://www.udg.edu",
      external: true,
    },
    {
      label: t("footer.externalLinks.formulaStudent"),
      href: "https://www.formulastudent.es/",
      external: true,
    },
    {
      label: t("footer.externalLinks.contact"),
      href: "mailto:info@udgracingdivision.com",
      external: false,
    },
  ];
  return (
    <footer
      id="contact"
      ref={ref}
      className="bg-black border-t border-zinc-800 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="md:col-span-2"
          >
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              src="/logo_udgRacing.png"
              alt="UdG Racing Division"
              className="h-12 w-auto mb-4"
            />
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="text-gray-400 mb-6 max-w-md"
            >
              {t("footer.description")}
            </motion.p>

            {/* Social links */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--color-racing-red)] transition-all duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <h3 className="font-bold text-white text-lg mb-4 uppercase tracking-wide">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.05,
                  }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{
                      x: 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="text-gray-400 hover:text-[var(--color-racing-red)] transition-colors duration-300 flex items-center gap-2"
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* External links & Contact */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
          >
            <h3 className="font-bold text-white text-lg mb-4 uppercase tracking-wide">
              {t("footer.links")}
            </h3>
            <ul className="space-y-2 mb-6">
              {externalLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.05,
                  }}
                >
                  <motion.a
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    whileHover={{
                      x: 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="text-gray-400 hover:text-[var(--color-racing-red)] transition-colors duration-300 flex items-center gap-2"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={14} />}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              className="space-y-3 text-sm"
            >
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span>
                  {t("footer.address")}
                  <br />
                  {t("footer.city")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="flex-shrink-0" />
                <motion.a
                  href="mailto:info@udgracingdivision.com"
                  whileHover={{
                    x: 3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="hover:text-[var(--color-racing-red)] transition-colors duration-300"
                >
                  info@udgracingdivision.com
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: 0.7,
          }}
          className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm"
        >
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{
                y: -2,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="hover:text-[var(--color-racing-red)] transition-colors duration-300"
            >
              {t("footer.privacy")}
            </motion.a>
            <motion.a
              href="#"
              whileHover={{
                y: -2,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="hover:text-[var(--color-racing-red)] transition-colors duration-300"
            >
              {t("footer.terms")}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
