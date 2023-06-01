"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const uid = "api::review.review";

const components = {
  author: true,
  contents: true,
};

module.exports = createCoreController(uid, () => {
  return {
    async find(ctx) {
      if (ctx.query.populate === "*") {
        const entity = await strapi.entityService.findMany(uid, {
          ...ctx.query,
          populate: components,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }
      return super.find(ctx);
    },
    async findOne(ctx) {
      const { id } = ctx.request.params;

      if (ctx.query.populate === "*") {
        const entity = await strapi.entityService.findOne(uid, id, {
          ...ctx.query,
          populate: components,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }

      return super.findOne(ctx);
    },
  };
});
