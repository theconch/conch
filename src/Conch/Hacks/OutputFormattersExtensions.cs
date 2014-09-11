using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.OptionDescriptors;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Conch
{
    /// <summary>
    /// Summary description for OutputFormattersExtensions
    /// </summary>
    public static class OutputFormattersExtensions
    {
        /// <summary>
        /// Insert an <see cref="IOutputFormatter"/> to a descriptor collection.
        /// </summary>
        /// <param name="descriptors">A list of OutputFormatterDescriptors</param>
        /// <param name="outputFormatter">An <see cref="IOutputFormatter"/> instance.</param>
        /// <returns>OutputFormatterDescriptor representing the added instance.</returns>
        public static OutputFormatterDescriptor Replace<T>(this IList<OutputFormatterDescriptor> descriptors,
                                                       T outputFormatter) where T : IOutputFormatter
        {
            var descriptor = new OutputFormatterDescriptor(outputFormatter);
            var current = descriptors.FirstOrDefault(d => d.Instance is T);
            if (current != null)
            {
                var index = descriptors.IndexOf(current);
                descriptors.RemoveAt(index);
                descriptors.Insert(index, outputFormatter);
            }
            else
            {
                descriptors.Add(outputFormatter);
            }
            return descriptor;
        }
    }
}