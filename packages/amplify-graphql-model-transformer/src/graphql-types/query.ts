import { TransformerTransformSchemaStepContextProvider } from '@aws-amplify/graphql-transformer-interfaces';
import { InputObjectTypeDefinitionNode, ObjectTypeDefinitionNode } from 'graphql';
import { FieldWrapper, ObjectDefinitionWrapper } from '../wrappers/object-definition-wrapper';
import { makeConditionFilterInput } from './common';
export const makeListQueryFilterInput = (
  ctx: TransformerTransformSchemaStepContextProvider,
  name: string,
  object: ObjectTypeDefinitionNode,
): InputObjectTypeDefinitionNode => {
  return makeConditionFilterInput(ctx, name, object).serialize();
};

export const makeListQueryModel = (type: ObjectTypeDefinitionNode, modelName: string, isSyncEnabled: boolean): ObjectTypeDefinitionNode => {
  const outputType = ObjectDefinitionWrapper.create(modelName);

  outputType.addField(FieldWrapper.create('items', type.name.value, false, true));
  outputType.addField(FieldWrapper.create('nextToken', 'String', true, false));

  if (isSyncEnabled) {
    outputType.addField(FieldWrapper.create('startedAt', 'AWSTimestamp', true, false));
  }

  return outputType.serialize();
};
