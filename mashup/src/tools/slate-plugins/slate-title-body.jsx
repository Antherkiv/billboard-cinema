// This file has been ported from my personal github and translated into regular ES6 from TS
// The source is license under mit like this project
// https://github.com/Antherkiv/slate-plugins
import React from 'react';
import { List } from 'immutable';
import { Block, Text } from 'slate';

const LAST_CHILD_IS_VOID_INVALID = 'last_child_is_void_invalid';
const CHILD_TYPE_INVALID = 'child_type_invalid';
const CHILD_UNKNOWN = 'child_unknown';
const CHILD_REQUIRED = 'child_required';
const CHILD_OBJECT_INVALID = 'child_object_invalid';

const placeholderStyle = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: '0',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: 0.33
};

export default () => ({
  schema: {
    document: {
      nodes: [
        { match: { type: 'title' }, min: 1, max: 1 },
        { match: { type: 'body' }, min: 1, max: 1 }
      ],
      normalize: (change, { code, node, child, index }) => {
        switch (code) {
          case CHILD_TYPE_INVALID: {
            if (node.object !== 'text' && node.nodes.size < 3) {
              const type = index === 0 ? 'title' : 'body';
              return change.setNodeByKey(child.key, type);
            }
          }
          case CHILD_UNKNOWN: {
            return change.undo();
          }
          case CHILD_REQUIRED: {
            const type = index === 0 ? 'title' : 'body';
            const block = Block.create(type);

            return change.insertNodeByKey(node.key, index, block);
          }
        }
      }
    },

    blocks: {
      title: {
        nodes: [{ match: { object: 'text', min: 1, max: 1 } }],
        normalize: (change, { code, node, child, index }) => {
          if (code === CHILD_OBJECT_INVALID || code === CHILD_UNKNOWN) {
            return change.undo();
          }
        }
      },
      body: {
        nodes: [{ match: { object: 'block', min: 1 } }],
        last: {
          isVoid: false
        },
        normalize: (change, { code, node, child, index }) => {
          switch (code) {
            case LAST_CHILD_IS_VOID_INVALID: {
              const block = Block.create('paragraph');
              if (
                node.object !== 'text' &&
                node.nodes.size === 1 &&
                child.object === 'text'
              ) {
                return change.replaceNodeByKey(child.key, block);
              }
              return (
                node.object !== 'text' &&
                change.insertNodeByKey(node.key, node.nodes.size, block)
              );
            }
            case CHILD_OBJECT_INVALID:
            case CHILD_REQUIRED: {
              const block = Block.create('paragraph');
              return change.insertNodeByKey(node.key, index, block);
            }
          }
        }
      }
    }
  },

  renderPlaceholder(props) {
    const {
      editor: {
        props: { placeholder, titlePlaceholder, contentPlaceholder }
      },
      node,
      parent
    } = props;

    if (
      node.object !== 'block' ||
      (!List.isList(node.nodes) &&
        node.nodes.every(item => Text.isText(item))) ||
      (parent.object !== 'document' &&
        (parent.object === 'block' && parent.type !== 'body')) ||
      node.text !== ''
    ) {
      return;
    }

    if (node.type === 'title' && node.getBlocks().size === 0) {
      return (
        <span contentEditable={false} style={placeholderStyle}>
          {placeholder || titlePlaceholder}
        </span>
      );
    }

    if (
      parent.object !== 'text' &&
      node.type === 'paragraph' &&
      parent.getBlocks().size === 1
    ) {
      return (
        <span contentEditable={false} style={placeholderStyle}>
          {contentPlaceholder}
        </span>
      );
    }
  }
});
