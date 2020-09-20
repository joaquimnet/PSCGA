const sanitize = require('sanitize-html');

exports.sanitize = (content) => sanitize(content, {
  allowedTags: sanitize.defaults.allowedTags.concat(['img', 'span']),
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    '*': ['style'],
  },
  allowedStyles: {
    '*': {
      // Match HEX and RGB
      color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
      'text-align': [/^left$/, /^right$/, /^center$/],
      // Match any number with px, em, or %
      'font-size': [/^\d+(?:px|em|%)$/],
      width: [/^\d+(?:px|em|%)$/],
      height: [/^\d+(?:px|em|%)$/],
    },
    p: {
      'font-size': [/^\d+rem$/],
    },
  },
});
